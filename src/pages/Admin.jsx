import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

import {
  fetchPrices,
  subscribePrices,
  savePrices,
  resetPrices,
  updateServicePrice,
  getServicesWithUpdatedPrices
} from '../utils/priceManager'
import {
  fetchCatalogs,
  subscribeCatalogs,
  saveCatalogsForLanguage,
  resetCatalogs,
  getNextCatalogId
} from '../utils/catalogManager'
import { signIn, signOut as fbSignOut, onAuthChange } from '../firebase'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('prices')

  const originalServices = translations[language].catalog.services

  const [services, setServices] = useState([])
  const [prices, setPrices] = useState({})
  const [editingCatalog, setEditingCatalog] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)

  useEffect(() => {
    let unsubCatalogs = null
    let unsubPrices = null
    let mounted = true

    const setup = async () => {
      try {
        const catalogs = await fetchCatalogs(language, originalServices)
        const pricesData = await fetchPrices(language)

        const merged = getServicesWithUpdatedPrices(catalogs || originalServices, pricesData)

        const initialPrices = {}
        merged.forEach(service => {
          const priceVal = typeof service.price === 'string' ? parseFloat(service.price) : service.price
          initialPrices[service.id] = priceVal
        })

        if (!mounted) return
        setServices(merged)
        setPrices(initialPrices)

        unsubCatalogs = subscribeCatalogs(language, async (catalogsUpdate) => {
          const useCatalogs = catalogsUpdate || originalServices
          const latestPrices = await fetchPrices(language)
          const mergedNow = getServicesWithUpdatedPrices(useCatalogs, latestPrices)
          if (mounted) setServices(mergedNow)
        }, (err) => console.error('Catalog subscription error', err))

        unsubPrices = subscribePrices(language, (pricesUpdate) => {
          const newPrices = pricesUpdate || {}
          if (!mounted) return
          setPrices(prev => ({ ...prev, ...newPrices }))
          setServices(prev => prev.map(s => ({
            ...s,
            price: newPrices[s.id] !== undefined ? newPrices[s.id] : s.price
          })))
        }, (err) => console.error('Prices subscription error', err))
      } catch (err) {
        console.error('Failed to initialize admin data:', err)
        setError('Failed to connect to remote storage. Ensure Firebase is configured.')
      }
    }

    setup()

    return () => {
      mounted = false
      if (unsubCatalogs) unsubCatalogs()
      if (unsubPrices) unsubPrices()
    }
  }, [language, originalServices])

  useEffect(() => {
    let unsub = null
    const start = async () => {
      unsub = await onAuthChange((user) => {
        setIsAuthenticated(!!user)
      })
    }
    start()
    return () => { if (unsub) unsub() }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      setError('')
      setPassword('')
    } catch (err) {
      console.error('Auth sign-in error:', err)
      setError('Sign-in failed. Check email/password.')
    }
  }

  const handleLogout = async () => {
    try {
      await fbSignOut()
    } catch (err) {
      console.error('Sign-out error:', err)
    }
    setIsAuthenticated(false)
    setPassword('')
    setError('')
    setSuccess('')
  }

  const handlePriceChange = (serviceId, newPrice) => {
    const cleaned = newPrice.toString().replace(/[^0-9.]/g, '')
    setPrices(prev => ({ ...prev, [serviceId]: cleaned === '' ? '' : cleaned }))
  }

  const handleSave = async () => {
    const invalidPrices = Object.entries(prices).filter(([id, price]) => {
      const numPrice = parseFloat(price)
      return isNaN(numPrice) || numPrice < 0
    })

    if (invalidPrices.length > 0) {
      setError('Please enter valid prices (numbers only) for all services.')
      return
    }

    const pricesToSave = {}
    Object.entries(prices).forEach(([id, price]) => {
      pricesToSave[id] = parseFloat(price)
    })

    try {
      const ok = await savePrices(language, pricesToSave)
      if (ok) {
        const updatedServices = services.map(service => ({
          ...service,
          price: pricesToSave[service.id] !== undefined ? pricesToSave[service.id] : service.price
        }))
        setServices(updatedServices)
        await saveCatalogsForLanguage(language, updatedServices)
        setSuccess('Prices saved successfully! Changes will appear on the website immediately.')
        setError('')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to save prices. Please try again.')
      }
    } catch (err) {
      console.error('savePrices threw an error:', err)
      const msg = err?.message || String(err)
      setError('Failed to save prices: ' + msg)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all prices to original values? This cannot be undone.')) return

    try {
      const ok = await resetPrices()
      const originalPrices = {}
      originalServices.forEach(service => {
        const price = typeof service.price === 'string' ? parseFloat(service.price) : service.price
        originalPrices[service.id] = price
      })
      setPrices(originalPrices)

      const updatedServices = services.map(service => {
        const originalService = originalServices.find(s => s.id === service.id)
        if (originalService) {
          const price = typeof originalService.price === 'string' ? parseFloat(originalService.price) : originalService.price
          return { ...service, price }
        }
        return service
      })
      setServices(updatedServices)
      await saveCatalogsForLanguage(language, updatedServices)

      if (ok) {
        setSuccess('Prices reset to original values.')
        setError('')
      } else {
        setError('Failed to reset prices in remote storage.')
      }
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('reset error', err)
      setError('Failed to reset prices: ' + (err?.message || String(err)))
    }
  }

  // Catalog functions
  const handleAddCatalog = () => {
    const newCatalog = {
      id: getNextCatalogId(services),
      category: 'general',
      name: 'New Service',
      description: 'Service description',
      price: 0,
      unit: 'per kg',
      features: ['Feature 1', 'Feature 2']
    }
    setEditingCatalog(newCatalog)
  }

  const handleEditCatalog = (catalog) => {
    const syncedPrice = prices[catalog.id] !== undefined ? prices[catalog.id] : catalog.price
    setEditingCatalog({ ...catalog, price: syncedPrice })
  }

  const handleDeleteCatalog = async (catalogId) => {
    if (!window.confirm('Are you sure you want to delete this catalog? This cannot be undone.')) return
    const updated = services.filter(s => s.id !== catalogId)
    setServices(updated)
    try {
      const ok = await saveCatalogsForLanguage(language, updated)
      if (ok) setSuccess('Catalog deleted successfully!')
      else setError('Failed to delete catalog.')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('delete catalog error', err)
      setError('Failed to delete catalog: ' + (err?.message || String(err)))
    }
  }

  const handleSaveCatalog = async () => {
    if (!editingCatalog || !editingCatalog.name || !editingCatalog.description) {
      setError('Please fill in name and description.')
      return
    }
    const price = typeof editingCatalog.price === 'string' ? parseFloat(editingCatalog.price) || 0 : editingCatalog.price
    const updatedCatalog = { ...editingCatalog, price }
    let updated
    if (editingCatalog.id && services.find(s => s.id === editingCatalog.id)) {
      updated = services.map(s => s.id === editingCatalog.id ? updatedCatalog : s)
    } else {
      updated = [...services, updatedCatalog]
    }
    setServices(updated)
    try {
      await updateServicePrice(updatedCatalog.id, language, price)
      const ok = await saveCatalogsForLanguage(language, updated)
      if (ok) {
        setSuccess('Catalog saved successfully!')
        setEditingCatalog(null)
      } else {
        setError('Failed to save catalog.')
      }
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('save catalog error', err)
      setError('Failed to save catalog: ' + (err?.message || String(err)))
    }
  }

  const handleCancelEdit = () => setEditingCatalog(null)

  // Drag & drop
  const handleDragStart = (e, index) => { setDraggedIndex(index); e.dataTransfer.effectAllowed = 'move' }
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }
  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) { setDraggedIndex(null); return }
    const updated = [...services]
    const draggedItem = updated[draggedIndex]
    updated.splice(draggedIndex, 1)
    updated.splice(dropIndex, 0, draggedItem)
    setServices(updated)
    setDraggedIndex(null)
    saveCatalogsForLanguage(language, updated).then(ok => { if (ok) setSuccess('Catalog order updated!'); setTimeout(() => setSuccess(''), 2000) })
  }
  const handleDragEnd = () => setDraggedIndex(null)

  const handleResetCatalogs = async () => {
    if (!window.confirm('Are you sure you want to reset all catalogs to original values? This cannot be undone.')) return
    try {
      const okCat = await resetCatalogs()
      const okPrice = await resetPrices()
      setServices(originalServices)
      const originalPrices = {}
      originalServices.forEach(s => { originalPrices[s.id] = typeof s.price === 'string' ? parseFloat(s.price) : s.price })
      setPrices(originalPrices)
      if (okCat && okPrice) setSuccess('Catalogs reset to original values.')
      else setError('Failed to reset remote data. Check Firebase configuration.')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('reset catalogs error', err)
      setError('Failed to reset catalogs: ' + (err?.message || String(err)))
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-page">
        <div className="admin-container">
          <div className="admin-login">
            <h1>Admin Panel</h1>
            <p className="admin-subtitle">Edit Service Prices</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" required />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="btn-login">Login</button>
            </form>
            <button onClick={() => navigate('/')} className="btn-back">← Back to Website</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p className="admin-subtitle">Current Language: {language.toUpperCase()}</p>
          <div className="admin-actions">
            <button onClick={handleLogout} className="btn-logout">Logout</button>
            <button onClick={() => navigate('/')} className="btn-back">View Website</button>
          </div>
        </div>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'prices' ? 'active' : ''}`} onClick={() => setActiveTab('prices')}>Service Prices</button>
          <button className={`tab-btn ${activeTab === 'catalogs' ? 'active' : ''}`} onClick={() => setActiveTab('catalogs')}>Manage Catalogs</button>
          <button className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>Manage Photos</button>
        </div>

        {activeTab === 'prices' && (
          <div className="admin-content">
            <div className="price-editor">
              <div className="editor-header">
                <h2>Service Prices</h2>
                <div className="editor-actions">
                  <button onClick={handleReset} className="btn-reset">Reset to Original</button>
                  <button onClick={handleSave} className="btn-save">Save Changes</button>
                </div>
              </div>

              <div className="services-list">
                {services.map(service => (
                  <div key={service.id} className="service-edit-item">
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <p className="service-desc">{service.description}</p>
                      <span className="service-unit">Unit: {service.unit}</span>
                    </div>
                    <div className="price-input-group">
                      <label htmlFor={`price-${service.id}`}>Price (₹)</label>
                      <input type="text" id={`price-${service.id}`} value={prices[service.id] || ''} onChange={(e) => handlePriceChange(service.id, e.target.value)} placeholder="Enter price" className="price-input" />
                      <span className="price-unit-display">/{service.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-info">
              <h3>Instructions</h3>
              <ul>
                <li>Enter the new price for each service</li>
                <li>Prices should be numbers only (e.g., 99, 120.50)</li>
                <li>Click "Save Changes" to update prices on the website</li>
                <li>Changes appear immediately on the website</li>
                <li>Use "Reset to Original" to restore default prices</li>
                <li>Prices are saved per language</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'catalogs' && (
          <div className="admin-content">
            <div className="catalog-editor">
              <div className="editor-header">
                <h2>Manage Catalogs</h2>
                <div className="editor-actions">
                  <button onClick={handleResetCatalogs} className="btn-reset">Reset to Original</button>
                  <button onClick={handleAddCatalog} className="btn-save">Add New Catalog</button>
                </div>
              </div>

              {editingCatalog ? (
                <div className="catalog-form">
                  <h3>{editingCatalog.id ? 'Edit Catalog' : 'Add New Catalog'}</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input type="text" value={editingCatalog.name} onChange={(e) => setEditingCatalog({ ...editingCatalog, name: e.target.value })} placeholder="Service name" />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select value={editingCatalog.category} onChange={(e) => setEditingCatalog({ ...editingCatalog, category: e.target.value })}>
                        <option value="general">General Laundry</option>
                        <option value="ironing">Ironing</option>
                        <option value="dry-clean">Dry Cleaning</option>
                        <option value="special">Special Services</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea value={editingCatalog.description} onChange={(e) => setEditingCatalog({ ...editingCatalog, description: e.target.value })} placeholder="Service description" rows="3" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Price</label>
                      <input type="text" value={editingCatalog.price} onChange={(e) => setEditingCatalog({ ...editingCatalog, price: e.target.value })} placeholder="0" />
                    </div>
                    <div className="form-group">
                      <label>Unit</label>
                      <input type="text" value={editingCatalog.unit} onChange={(e) => setEditingCatalog({ ...editingCatalog, unit: e.target.value })} placeholder="per kg" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Features (one per line)</label>
                    <textarea value={editingCatalog.features?.join('\n') || ''} onChange={(e) => setEditingCatalog({ ...editingCatalog, features: e.target.value.split('\n').filter(f => f.trim()) })} placeholder="Feature 1\nFeature 2" rows="4" />
                  </div>
                  <div className="form-actions">
                    <button onClick={handleCancelEdit} className="btn-reset">Cancel</button>
                    <button onClick={handleSaveCatalog} className="btn-save">Save Catalog</button>
                  </div>
                </div>
              ) : (
                <div className="catalogs-list">
                  <p className="drag-hint">💡 Drag and drop catalogs to reorder them</p>
                  {services.map((service, index) => (
                    <div key={service.id} className={`catalog-item ${draggedIndex === index ? 'dragging' : ''}`} draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} onDragEnd={handleDragEnd}>
                      <div className="drag-handle">☰</div>
                      <div className="catalog-info">
                        <h3>{service.name}</h3>
                        <p className="catalog-desc">{service.description}</p>
                        <div className="catalog-meta">
                          <span className="catalog-category">{service.category}</span>
                          <span className="catalog-price">₹{prices[service.id] !== undefined ? prices[service.id] : service.price}/{service.unit}</span>
                        </div>
                        {service.features && service.features.length > 0 && (
                          <ul className="catalog-features">
                            {service.features.slice(0, 3).map((feature, idx) => (<li key={idx}>{feature}</li>))}
                          </ul>
                        )}
                      </div>
                      <div className="catalog-actions">
                        <button onClick={() => handleEditCatalog(service)} className="btn-edit">Edit</button>
                        <button onClick={() => handleDeleteCatalog(service.id)} className="btn-delete">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-info">
              <h3>Catalog Management</h3>
              <ul>
                <li>Click "Add New Catalog" to create a service</li>
                <li>Click "Edit" to modify a catalog</li>
                <li>Drag catalogs to reorder them</li>
                <li>Changes save automatically</li>
                <li>Use "Reset to Original" to restore defaults</li>
                <li>Catalogs are saved per language</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

