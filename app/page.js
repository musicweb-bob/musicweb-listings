'use client'

import { useState, useEffect } from 'react'
import { Upload, Eye, Plus, X, Save, Download } from 'lucide-react'
import styles from './page.module.css'

export default function Home() {
  const [listings, setListings] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    artist: '',
    album: '',
    format: 'Vinyl - LP',
    condition: 'Very Good Plus (VG+)',
    year: new Date().getFullYear(),
    label: '',
    seller: '',
    price: '',
    image: null,
    imagePreview: null
  })

  // Load listings from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('musicweb_listings')
    if (saved) {
      setListings(JSON.parse(saved))
    }
  }, [])

  // Save listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('musicweb_listings', JSON.stringify(listings))
  }, [listings])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? (name === 'price' ? value : parseInt(value)) : value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddListing = () => {
    if (!formData.artist || !formData.album || !formData.label || !formData.seller || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    const newListing = {
      id: Date.now(),
      ...formData
    }

    setListings(prev => [newListing, ...prev])

    // Reset form
    setFormData({
      artist: '',
      album: '',
      format: 'Vinyl - LP',
      condition: 'Very Good Plus (VG+)',
      year: new Date().getFullYear(),
      label: '',
      seller: '',
      price: '',
      image: null,
      imagePreview: null
    })
    setShowPreview(false)
  }

  const handleDeleteListing = (id) => {
    setListings(prev => prev.filter(listing => listing.id !== id))
  }

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(listings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `musicweb-listings-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Record Listing Manager</h1>
          <p>Create and manage your MUSICweb® marketplace listings</p>
        </div>

        <div className={styles.twoColumnLayout}>
          {/* Form Section */}
          <div className={styles.formSection}>
            <h2>New Listing</h2>

            <div className={styles.formGroup}>
              {/* Artist */}
              <div className={styles.field}>
                <label>Artist *</label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="e.g., Pink Floyd"
                  className={styles.input}
                />
              </div>

              {/* Album Title */}
              <div className={styles.field}>
                <label>Album Title *</label>
                <input
                  type="text"
                  name="album"
                  value={formData.album}
                  onChange={handleInputChange}
                  placeholder="e.g., The Dark Side of the Moon"
                  className={styles.input}
                />
              </div>

              {/* Format */}
              <div className={styles.field}>
                <label>Format</label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option>Vinyl - LP</option>
                  <option>Vinyl - Single</option>
                  <option>CD</option>
                  <option>Cassette</option>
                  <option>Digital</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Condition */}
              <div className={styles.field}>
                <label>Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option>Mint (M)</option>
                  <option>Near Mint (NM)</option>
                  <option>Very Good Plus (VG+)</option>
                  <option>Very Good (VG)</option>
                  <option>Good Plus (G+)</option>
                  <option>Good (G)</option>
                  <option>Fair (F)</option>
                  <option>Poor (P)</option>
                </select>
              </div>

              {/* Year */}
              <div className={styles.field}>
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              {/* Label */}
              <div className={styles.field}>
                <label>Record Label *</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  placeholder="e.g., Harvest Records"
                  className={styles.input}
                />
              </div>

              {/* Seller */}
              <div className={styles.field}>
                <label>Seller Name *</label>
                <input
                  type="text"
                  name="seller"
                  value={formData.seller}
                  onChange={handleInputChange}
                  placeholder="Your seller name"
                  className={styles.input}
                />
              </div>

              {/* Price */}
              <div className={styles.field}>
                <label>Price *</label>
                <div className={styles.priceInput}>
                  <span>$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className={styles.field}>
                <label>Album Cover Image</label>
                <label className={styles.uploadLabel}>
                  <Upload size={16} />
                  <span>Click to upload cover art</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {formData.imagePreview && (
                <div className={styles.previewImage}>
                  <p>Preview:</p>
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={styles.buttonSecondary}
                >
                  <Eye size={16} />
                  Preview
                </button>
                <button
                  onClick={handleAddListing}
                  className={styles.buttonPrimary}
                >
                  <Plus size={16} />
                  Add Listing
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            {showPreview && (
              <div className={styles.previewSection}>
                <h3>Listing Preview</h3>

                <div className={styles.listingCard}>
                  <div className={styles.cardImage}>
                    {formData.imagePreview ? (
                      <img src={formData.imagePreview} alt={formData.album} />
                    ) : (
                      <div className={styles.placeholderImage}>🎵</div>
                    )}
                  </div>

                  <div className={styles.cardInfo}>
                    <h4>{formData.album || 'Album Title'}</h4>
                    <p className={styles.artist}>{formData.artist || 'Artist Name'}</p>

                    <div className={styles.details}>
                      <div>Format: <strong>{formData.format}</strong></div>
                      <div>Condition: <strong>{formData.condition}</strong></div>
                      <div>Year: <strong>{formData.year}</strong></div>
                      <div>Label: <strong>{formData.label}</strong></div>
                      <div className={styles.seller}>Seller: <strong>{formData.seller}</strong></div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.price}>${parseFloat(formData.price || 0).toFixed(2)}</div>
                      <button className={styles.contactButton}>Contact Seller</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listings Count */}
            <div className={styles.statsSection}>
              <p><strong>{listings.length}</strong> listings created</p>
              {listings.length > 0 && (
                <button
                  onClick={handleDownloadJSON}
                  className={styles.buttonSecondary}
                >
                  <Download size={14} />
                  Export as JSON
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 && (
          <div className={styles.listingsSection}>
            <h2>Created Listings ({listings.length})</h2>
            <div className={styles.grid}>
              {listings.map(listing => (
                <div key={listing.id} className={styles.listingCard}>
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className={styles.deleteButton}
                  >
                    <X size={14} />
                  </button>

                  <div className={styles.cardImage}>
                    {listing.imagePreview ? (
                      <img src={listing.imagePreview} alt={listing.album} />
                    ) : (
                      <div className={styles.placeholderImage}>🎵</div>
                    )}
                  </div>

                  <div className={styles.cardInfo}>
                    <h4>{listing.album}</h4>
                    <p className={styles.artist}>{listing.artist}</p>

                    <div className={styles.details}>
                      <div>Format: <strong>{listing.format}</strong></div>
                      <div>Condition: <strong>{listing.condition}</strong></div>
                      <div>Year: <strong>{listing.year}</strong></div>
                      <div>Label: <strong>{listing.label}</strong></div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.price}>${parseFloat(listing.price).toFixed(2)}</div>
                      <p className={styles.sellerSmall}>Seller: <strong>{listing.seller}</strong></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
