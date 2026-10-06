import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Layers, 
  MapPin, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageCircle, 
  Check, 
  AlertTriangle, 
  Upload, 
  RotateCcw,
  Sparkles,
  Save,
  Search,
  Lock,
  Unlock,
  KeyRound,
  Type,
  Image as ImageIcon,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  Download
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, OrderStatus, ProductCategory, ProductSubcategory, SiteContent } from '../types';
import { JewelleryImage } from './JewelleryImage';
import { compressImageFile } from '../utils/imageCompressor';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    siteContent,
    updateSiteContent,
    resetSiteContent,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateStock, 
    resetToDefaultProducts,
    saveAllProducts,
    orders, 
    updateOrderStatus, 
    deleteOrder,
    offers, 
    updateOffer,
    storeSettings, 
    updateStoreSettings,
    reviews,
    deleteReview
  } = useShop();

  // Authentication State
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSavingAllProducts, setIsSavingAllProducts] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'texts' | 'orders' | 'inventory' | 'offers' | 'business'>('dashboard');

  // Inline non-blocking confirmation states (eliminates all window.confirm freezing)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteOrderId, setConfirmDeleteOrderId] = useState<string | null>(null);
  const [confirmResetText, setConfirmResetText] = useState(false);
  const [confirmResetCatalog, setConfirmResetCatalog] = useState(false);

  // Transient notification toasts
  const [actionNotification, setActionNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setActionNotification({ message, type });
    setTimeout(() => {
      setActionNotification(null);
    }, 2800);
  };

  // Text Editing State
  const [textForm, setTextForm] = useState<SiteContent>(siteContent);
  const [textSaveSuccess, setTextSaveSuccess] = useState(false);

  // Sync textForm when siteContent changes
  React.useEffect(() => {
    setTextForm(siteContent);
  }, [siteContent]);

  // Product Edit/Add state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'jewellery',
    subcategory: 'necklaces',
    price: 3500,
    originalPrice: 4500,
    discountPercentage: 22,
    weight: '120 g',
    size: 'Adjustable Cord',
    availableSizes: ['Adjustable Cord (Standard 16-18 Inch)'],
    material: 'High-Grade Brass Alloy & Cubic Zirconia',
    finish: '18K Antique Gold Finish',
    occasion: 'Weddings & Celebrations',
    description: '',
    careInstructions: ['Keep away from perfumes', 'Store in velvet box'],
    stockQuantity: 10,
    images: [],
    sku: `VEL-${Date.now().toString().slice(-4)}`,
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isAdminOpen) return null;

  // Handle Login via backend validation (Strict: zero password hints or leaks)
  const verifyPassword = async (pass: string) => {
    const clean = pass.trim();
    if (!clean || isLoggingIn) return;

    setIsLoggingIn(true);
    setPinError('');
    const result = await loginAdmin(clean);
    setIsLoggingIn(false);

    if (result.success) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect password. Access denied.');
      setPinInput('');
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyPassword(pinInput);
  };

  const handleDigitClick = (digit: string) => {
    if (isLoggingIn) return;
    const nextPin = pinInput + digit;
    setPinInput(nextPin);
    setPinError('');
    if (nextPin.length === 10) {
      verifyPassword(nextPin);
    }
  };

  const handleBackspace = () => {
    setPinInput(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.toLowerCase() === '/admin' || window.location.pathname.toLowerCase() === '/admin/' || window.location.hash.toLowerCase() === '#admin') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    handleClose();
  };

  // Stats
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'New' || o.status === 'Processing');
  const lowStockCount = products.filter(p => p.stockQuantity <= 3).length;

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressedBase64 = await compressImageFile(file, 1000, 0.82);
        if (compressedBase64) {
          setImagePreview(compressedBase64);
          setProductForm(prev => ({
            ...prev,
            images: [compressedBase64, ...(prev.images || [])]
          }));
        }
      } catch (err) {
        console.warn('Compression notice:', err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setProductForm(prev => ({
      ...prev,
      images: [newImageUrl.trim(), ...(prev.images || [])]
    }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProductForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleExportCatalog = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vellura-catalog-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showNotification(`Exported ${products.length} products to JSON backup!`);
    } catch {
      showNotification('Failed to export catalog JSON', 'error');
    }
  };

  const handleImportCatalog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          await saveAllProducts(parsed);
          showNotification(`Successfully imported ${parsed.length} products!`);
        } else {
          showNotification('Invalid JSON: Expected an array of products', 'error');
        }
      } catch {
        showNotification('Failed to parse catalog JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      await updateProduct(editingProduct.id, {
        ...productForm,
        inStock: (productForm.stockQuantity || 0) > 0,
      });
      showNotification(`"${productForm.name}" updated & saved permanently`);
      setEditingProduct(null);
    } else {
      await addProduct({
        name: productForm.name || 'New Vellura Creation',
        category: (productForm.category as ProductCategory) || 'jewellery',
        subcategory: (productForm.subcategory as ProductSubcategory) || 'necklaces',
        price: Number(productForm.price) || 0,
        originalPrice: Number(productForm.originalPrice) || Number(productForm.price) || 0,
        discountPercentage: Number(productForm.discountPercentage) || 0,
        weight: productForm.weight || '100 g',
        size: productForm.size,
        availableSizes: productForm.availableSizes,
        variants: productForm.variants,
        material: productForm.material || 'Premium Alloy',
        finish: productForm.finish || 'Antique Gold',
        occasion: productForm.occasion,
        fragrance: productForm.fragrance,
        waxType: productForm.waxType,
        burnTime: productForm.burnTime,
        description: productForm.description || 'Showroom piece',
        careInstructions: productForm.careInstructions || ['Handle with care'],
        stockQuantity: Number(productForm.stockQuantity) || 5,
        inStock: (Number(productForm.stockQuantity) || 5) > 0,
        images: productForm.images && productForm.images.length > 0 ? productForm.images : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=900'],
        sku: productForm.sku || `VEL-PROD-${Date.now().toString().slice(-4)}`,
      });
      showNotification(`"${productForm.name}" added & saved permanently`);
      setIsAddingProduct(false);
    }

    setProductForm({});
    setImagePreview('');
  };

  // Save Website Texts
  const handleSaveSiteTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteContent(textForm);
    setTextSaveSuccess(true);
    showNotification('All website texts and slogans saved successfully');
    setTimeout(() => setTextSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-[#1A1A1E] text-[#FAF8F5] w-full max-w-6xl max-h-[96vh] overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Action Toast */}
        {actionNotification && (
          <div className="absolute top-4 right-4 z-50 bg-[#121214] border border-[#D4AF37] text-[#FAF8F5] px-4 py-2.5 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{actionNotification.message}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1. SECURE LOGIN GATE (No Password Hints / No Leaks) */}
        {/* ========================================================= */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto w-full">
            <div className="w-16 h-16 rounded-full bg-[#121214] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-5 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
              Authorized Owner Access
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF8F5] mb-2">
              Vellura Admin Console
            </h3>
            <p className="text-xs text-[#8E8B85] mb-6">
              Enter the authorized showroom admin password to access store management controls.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              {/* Direct Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pinInput}
                  disabled={isLoggingIn}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPinInput(val);
                    setPinError('');
                    if (val.trim().length === 10) {
                      verifyPassword(val);
                    }
                  }}
                  placeholder="Enter Admin Password"
                  autoFocus
                  className="w-full px-4 py-3 bg-[#141418] border border-[#2E2E36] text-center font-mono text-base tracking-widest text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37] placeholder:text-[#555] placeholder:text-xs placeholder:tracking-normal pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8B85] hover:text-[#FAF8F5] p-1.5 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <div className="p-2.5 bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-center justify-center gap-1.5 animate-in fade-in">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              {/* Quick Numpad for Touch / Mobile Screens */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    disabled={isLoggingIn}
                    onClick={() => {
                      if (btn === 'C') {
                        setPinInput('');
                        setPinError('');
                      } else if (btn === '⌫') {
                        handleBackspace();
                      } else {
                        handleDigitClick(btn);
                      }
                    }}
                    className="py-3 bg-[#1F1F24] hover:bg-[#2A2A32] active:bg-[#D4AF37] active:text-[#121214] border border-[#2E2E36] text-sm font-semibold text-[#FAF8F5] transition-colors disabled:opacity-50"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn || pinInput.length === 0}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Unlock Admin Section</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center text-[11px] text-[#8E8B85]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="hover:text-white"
                >
                  Return to Store
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. AUTHENTICATED ADMIN CONSOLE */
          /* ========================================================= */
          <>
            {/* Admin Bar Top */}
            <div className="p-4 sm:p-5 bg-[#121214] border-b border-[#2C2C32] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37]">
                  <Unlock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold tracking-wider text-[#FAF8F5]">
                    Vellura Owner Control Center
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block">
                    Logged in as Owner · Full Edit Access Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="text-xs text-[#8E8B85] hover:text-red-400 flex items-center gap-1 border border-[#2C2C32] px-2.5 py-1 transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-[#DCD6CB] hover:text-[#D4AF37] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Admin Body (Sidebar + Content Stage) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Sidebar Navigation */}
              <div className="w-full md:w-60 bg-[#141418] border-b md:border-b-0 md:border-r border-[#2C2C32] p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'dashboard' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'products' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Products & Images</span>
                </button>

                <button
                  onClick={() => setActiveTab('texts')}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'texts' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>Edit Website Texts</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'orders' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Orders</span>
                  </div>
                  {pendingOrders.length > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#6B1D2F] text-white text-[10px] rounded-full">
                      {pendingOrders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'inventory' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>Inventory</span>
                  </div>
                  {lowStockCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-600 text-white text-[10px] rounded-full">
                      {lowStockCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('offers')}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'offers' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>Offers & Deals</span>
                </button>

                <button
                  onClick={() => setActiveTab('business')}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider font-medium text-left transition-colors whitespace-nowrap ${
                    activeTab === 'business' ? 'bg-[#D4AF37] text-[#121214] font-bold' : 'text-[#DCD6CB] hover:bg-[#202026]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Store Details</span>
                </button>
              </div>

              {/* Main Stage Panel */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#18181C]">
                
                {/* ========================================================= */}
                {/* TAB: DASHBOARD OVERVIEW */}
                {/* ========================================================= */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-[#1F1F24] border border-[#2E2E36]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8B85]">Total Sales Value</span>
                        <p className="font-serif text-2xl font-semibold text-[#FAF8F5] tabular-nums mt-1">
                          ₹{totalSales.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-emerald-400">COD Bookings</span>
                      </div>

                      <div className="p-4 bg-[#1F1F24] border border-[#2E2E36]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8B85]">Total Orders</span>
                        <p className="font-serif text-2xl font-semibold text-[#FAF8F5] tabular-nums mt-1">
                          {orders.length}
                        </p>
                        <span className="text-[10px] text-[#D4AF37]">{pendingOrders.length} pending dispatch</span>
                      </div>

                      <div className="p-4 bg-[#1F1F24] border border-[#2E2E36]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8B85]">Products in Catalog</span>
                        <p className="font-serif text-2xl font-semibold text-[#FAF8F5] tabular-nums mt-1">
                          {products.length}
                        </p>
                        <span className="text-[10px] text-[#8E8B85]">Jewellery & Candles</span>
                      </div>

                      <div className="p-4 bg-[#1F1F24] border border-[#2E2E36]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8B85]">Low Stock Alert</span>
                        <p className="font-serif text-2xl font-semibold text-amber-400 tabular-nums mt-1">
                          {lowStockCount}
                        </p>
                        <span className="text-[10px] text-[#8E8B85]">≤ 3 pieces remaining</span>
                      </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('products');
                          setIsAddingProduct(true);
                        }}
                        className="p-4 bg-[#1F1F24] hover:bg-[#25252C] border border-[#D4AF37]/30 flex items-center gap-3 text-left transition-colors"
                      >
                        <Plus className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-xs font-semibold text-[#FAF8F5]">Add New Product</p>
                          <p className="text-[10px] text-[#8E8B85]">Upload photos & set price</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('texts')}
                        className="p-4 bg-[#1F1F24] hover:bg-[#25252C] border border-[#D4AF37]/30 flex items-center gap-3 text-left transition-colors"
                      >
                        <Type className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-xs font-semibold text-[#FAF8F5]">Edit Website Texts</p>
                          <p className="text-[10px] text-[#8E8B85]">Change headlines, slogans, copy</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('orders')}
                        className="p-4 bg-[#1F1F24] hover:bg-[#25252C] border border-[#D4AF37]/30 flex items-center gap-3 text-left transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-xs font-semibold text-[#FAF8F5]">Review Orders</p>
                          <p className="text-[10px] text-[#8E8B85]">WhatsApp customer contact</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB: PRODUCTS & IMAGES MANAGEMENT */}
                {/* ========================================================= */}
                {activeTab === 'products' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2E2E36] pb-4">
                      <div>
                        <h3 className="font-serif text-2xl text-[#FAF8F5]">Product & Image Management</h3>
                        <p className="text-xs text-[#8E8B85]">Change images, add multiple photos, update pricing and weights, add/remove pieces.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {confirmResetCatalog ? (
                          <div className="flex items-center gap-1.5 animate-in fade-in">
                            <button
                              type="button"
                              onClick={async () => {
                                setConfirmResetCatalog(false);
                                await resetToDefaultProducts();
                                showNotification('Catalog reset to default showroom items');
                              }}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                            >
                              Confirm Reset
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmResetCatalog(false)}
                              className="px-2.5 py-1.5 bg-[#2A2A32] text-xs text-[#DCD6CB]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmResetCatalog(true)}
                            className="px-3 py-2 border border-[#2E2E36] text-xs text-[#8E8B85] hover:text-white"
                          >
                            Reset Catalog
                          </button>
                        )}

                        {/* Cloudflare Pages Backup & Export */}
                        <button
                          type="button"
                          onClick={handleExportCatalog}
                          className="px-3 py-2 border border-[#2E2E36] hover:border-[#D4AF37]/50 text-xs text-[#DCD6CB] hover:text-[#FAF8F5] flex items-center gap-1.5 transition-colors"
                          title="Download catalog as JSON backup"
                        >
                          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Backup (JSON)</span>
                        </button>

                        <label
                          className="px-3 py-2 border border-[#2E2E36] hover:border-[#D4AF37]/50 text-xs text-[#DCD6CB] hover:text-[#FAF8F5] flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Import catalog from JSON backup"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Import</span>
                          <input
                            type="file"
                            accept=".json,application/json"
                            onChange={handleImportCatalog}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={async () => {
                            setIsSavingAllProducts(true);
                            await saveAllProducts();
                            setIsSavingAllProducts(false);
                            showNotification(`All ${products.length} products saved permanently to store catalog!`);
                          }}
                          disabled={isSavingAllProducts}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSavingAllProducts ? 'Saving Permanently...' : `Save All Changes (${products.length})`}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingProduct(true);
                            setEditingProduct(null);
                            setProductForm({
                              name: '',
                              category: 'jewellery',
                              subcategory: 'necklaces',
                              price: 3500,
                              originalPrice: 4500,
                              discountPercentage: 22,
                              weight: '120 g',
                              size: 'Adjustable Cord',
                              availableSizes: ['Adjustable Cord (Standard 16-18 Inch)'],
                              material: 'High-Grade Brass Alloy & Cubic Zirconia',
                              finish: '18K Antique Gold Finish',
                              stockQuantity: 10,
                              careInstructions: ['Wipe with soft cloth', 'Keep in velvet box'],
                              images: [],
                              sku: `VEL-${Date.now().toString().slice(-4)}`,
                            });
                          }}
                          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Product</span>
                        </button>
                      </div>
                    </div>

                    {/* Add / Edit Product Modal Form */}
                    {(isAddingProduct || editingProduct) && (
                      <form onSubmit={handleSaveProduct} className="p-6 bg-[#1F1F24] border border-[#D4AF37]/50 space-y-5 shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#2A2A32] pb-3">
                          <h4 className="font-serif text-lg text-[#FAF8F5]">
                            {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Showroom Creation'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
                            className="text-xs text-[#8E8B85] hover:text-[#FAF8F5]"
                          >
                            Cancel ✕
                          </button>
                        </div>

                        {/* Image Management Section */}
                        <div className="p-4 bg-[#141418] border border-[#D4AF37]/30 space-y-3">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                            <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                              Product Photographs (Upload, Add, or Replace)
                            </label>
                          </div>
                          
                          {/* Current Images Gallery */}
                          <div className="flex flex-wrap gap-3">
                            {(productForm.images || []).map((imgUrl, idx) => (
                              <div key={idx} className="relative w-20 h-20 bg-black border border-[#2E2E36] group overflow-hidden">
                                <img src={imgUrl} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="absolute top-1 right-1 bg-red-600/90 text-white p-1 text-[10px] rounded hover:bg-red-700"
                                  title="Remove Image"
                                >
                                  ✕
                                </button>
                                {idx === 0 && (
                                  <span className="absolute bottom-0 inset-x-0 bg-[#D4AF37] text-[#121214] text-[8px] font-bold text-center">
                                    PRIMARY
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Upload or Add URL Controls */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <label className="block text-[11px] text-[#8E8B85] mb-1">
                                Option A: Upload from Phone / PC
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileUpload}
                                className="w-full text-xs text-[#FAF8F5] file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:bg-[#2A2A32] file:text-[#D4AF37] hover:file:bg-[#3A3A44]"
                              />
                              {isCompressing && (
                                <p className="text-[10px] text-[#D4AF37] flex items-center gap-1.5 mt-1.5">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  <span>Optimizing photograph for high-speed storage...</span>
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[11px] text-[#8E8B85] mb-1">
                                Option B: Paste Image URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  placeholder="https://.../jewellery.jpg"
                                  value={newImageUrl}
                                  onChange={(e) => setNewImageUrl(e.target.value)}
                                  className="flex-1 px-2.5 py-1.5 bg-[#1F1F24] border border-[#2E2E36] text-xs text-[#FAF8F5]"
                                />
                                <button
                                  type="button"
                                  onClick={handleAddImageUrl}
                                  className="px-3 py-1.5 bg-[#2A2A32] hover:bg-[#D4AF37] hover:text-[#121214] text-xs font-semibold"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Product Title *</label>
                            <input
                              type="text"
                              required
                              value={productForm.name || ''}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">SKU / Code *</label>
                            <input
                              type="text"
                              required
                              value={productForm.sku || ''}
                              onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Selling Price (₹) *</label>
                            <input
                              type="number"
                              required
                              value={productForm.price || ''}
                              onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Original Price / MRP (₹)</label>
                            <input
                              type="number"
                              value={productForm.originalPrice || ''}
                              onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Weight (e.g. 145 g)</label>
                            <input
                              type="text"
                              value={productForm.weight || ''}
                              onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Stock Pieces Available</label>
                            <input
                              type="number"
                              value={productForm.stockQuantity || 0}
                              onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Category</label>
                            <select
                              value={productForm.category || 'jewellery'}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            >
                              <option value="jewellery">Artificial Jewellery</option>
                              <option value="candles">Decorative Candles</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[#DCD6CB] mb-1">Subcategory</label>
                            <select
                              value={productForm.subcategory || 'necklaces'}
                              onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value as ProductSubcategory })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            >
                              <option value="necklaces">Necklaces</option>
                              <option value="chokers">Chokers</option>
                              <option value="bridal">Bridal Sets</option>
                              <option value="earrings">Earrings</option>
                              <option value="rings">Rings</option>
                              <option value="bracelets">Bracelets</option>
                              <option value="bangles">Bangles</option>
                              <option value="decorative_candles">Decorative Candles</option>
                              <option value="scented_candles">Scented Candles</option>
                              <option value="gift_candles">Gift Candles</option>
                              <option value="candle_sets">Candle Sets</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[#DCD6CB] mb-1">Product Description</label>
                            <textarea
                              rows={3}
                              value={productForm.description || ''}
                              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-[#2A2A32]">
                          <button
                            type="button"
                            onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
                            className="px-4 py-2 border border-[#2E2E36] text-xs text-[#8E8B85] hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Product</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Products Table with INSTANT NON-BLOCKING Delete */}
                    <div className="border border-[#2E2E36] overflow-x-auto bg-[#1F1F24]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#141418] border-b border-[#2E2E36] text-[#8E8B85] uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3">Product</th>
                            <th className="p-3">Weight</th>
                            <th className="p-3">Price (₹)</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A2A32]">
                          {products.map(prod => (
                            <tr key={prod.id} className="hover:bg-[#25252C] transition-colors">
                              <td className="p-3 flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#121214] border border-[#2A2A32] flex-shrink-0 overflow-hidden">
                                  <JewelleryImage product={prod} showBadge={false} />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-[#FAF8F5]">{prod.name}</p>
                                  <span className="text-[10px] text-[#8E8B85]">{prod.sku} · {prod.subcategory}</span>
                                </div>
                              </td>
                              <td className="p-3 font-mono text-[#DCD6CB]">{prod.weight}</td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={prod.price}
                                  onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                                  className="w-20 px-2 py-1 bg-[#141418] border border-[#2E2E36] font-serif font-bold text-[#D4AF37]"
                                />
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => updateStock(prod.id, Math.max(0, prod.stockQuantity - 1))}
                                    className="w-6 h-6 bg-[#141418] border border-[#2E2E36] flex items-center justify-center text-xs hover:border-[#D4AF37]"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-mono font-bold text-xs">{prod.stockQuantity}</span>
                                  <button
                                    onClick={() => updateStock(prod.id, prod.stockQuantity + 1)}
                                    className="w-6 h-6 bg-[#141418] border border-[#2E2E36] flex items-center justify-center text-xs hover:border-[#D4AF37]"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingProduct(prod);
                                      setProductForm(prod);
                                      setIsAddingProduct(false);
                                    }}
                                    className="px-2 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121214] text-[11px] rounded"
                                  >
                                    Edit Photos / Details
                                  </button>

                                  {/* Zero-blocking inline Delete action */}
                                  {confirmDeleteId === prod.id ? (
                                    <div className="inline-flex items-center gap-1.5 animate-in fade-in">
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          setConfirmDeleteId(null);
                                          await deleteProduct(prod.id);
                                          showNotification(`"${prod.name}" removed from catalog`);
                                        }}
                                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-[11px] font-bold rounded flex items-center gap-1 shadow-md transition-all"
                                      >
                                        <Check className="w-3 h-3" />
                                        <span>Confirm Delete</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-2 py-1 bg-[#2A2A32] hover:bg-[#3A3A42] text-[#DCD6CB] text-[11px] rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteId(prod.id)}
                                      className="p-1.5 text-[#8E8B85] hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
                                      title="Delete product"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {products.length === 0 && (
                      <div className="text-center py-16 px-4 bg-[#141418] border border-[#2E2E36] my-4 shadow-inner">
                        <Package className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
                        <h4 className="font-serif text-lg text-[#FAF8F5] mb-1">Catalog Is Currently Empty</h4>
                        <p className="text-xs text-[#8E8B85] mb-5 max-w-md mx-auto">
                          All jewellery and candle products have been cleared. You can now add your new showroom pieces with custom photos, titles, prices, and descriptions.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingProduct(true);
                            setEditingProduct(null);
                            setProductForm({
                              name: '',
                              category: 'jewellery',
                              subcategory: 'necklaces',
                              price: 2500,
                              originalPrice: 3200,
                              weight: '110 g',
                              stockQuantity: 10,
                              images: [],
                              sku: `VEL-${Date.now().toString().slice(-4)}`,
                            });
                          }}
                          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Your First Product</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB: EDIT WEBSITE TEXTS & WORDS (REQUIREMENT) */}
                {/* ========================================================= */}
                {activeTab === 'texts' && (
                  <form onSubmit={handleSaveSiteTexts} className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2E2E36] pb-4">
                      <div>
                        <h3 className="font-serif text-2xl text-[#FAF8F5]">Website Copy & Words Editor</h3>
                        <p className="text-xs text-[#8E8B85]">
                          The owner can change anything like headlines, slogans, descriptions, and button labels across the entire website.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {confirmResetText ? (
                          <div className="flex items-center gap-1.5 animate-in fade-in">
                            <button
                              type="button"
                              onClick={async () => {
                                setConfirmResetText(false);
                                await resetSiteContent();
                                showNotification('Website texts reset to defaults');
                              }}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                            >
                              Confirm Reset
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmResetText(false)}
                              className="px-2.5 py-1.5 bg-[#2A2A32] text-xs text-[#DCD6CB]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmResetText(true)}
                            className="px-3 py-1.5 border border-[#2E2E36] text-xs text-[#8E8B85] hover:text-white"
                          >
                            Reset to Default Texts
                          </button>
                        )}

                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save All Texts</span>
                        </button>
                      </div>
                    </div>

                    {textSaveSuccess && (
                      <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>All website texts and slogans have been updated and saved successfully!</span>
                      </div>
                    )}

                    {/* Section 1: Hero Section Copy */}
                    <div className="p-5 bg-[#1F1F24] border border-[#2E2E36] space-y-4">
                      <h4 className="font-serif text-base text-[#D4AF37] border-b border-[#2A2A32] pb-2 font-semibold">
                        1. Homepage Hero Section
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-[#DCD6CB] mb-1">Small Kicker Label</label>
                          <input
                            type="text"
                            value={textForm.heroKicker}
                            onChange={(e) => setTextForm({ ...textForm, heroKicker: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#DCD6CB] mb-1">Primary CTA Button</label>
                          <input
                            type="text"
                            value={textForm.heroPrimaryBtn}
                            onChange={(e) => setTextForm({ ...textForm, heroPrimaryBtn: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Main Hero Headline *</label>
                          <input
                            type="text"
                            value={textForm.heroHeadline}
                            onChange={(e) => setTextForm({ ...textForm, heroHeadline: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] font-serif text-base text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Supporting Paragraph Text</label>
                          <textarea
                            rows={2}
                            value={textForm.heroSupporting}
                            onChange={(e) => setTextForm({ ...textForm, heroSupporting: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Jewellery & Candle Catalog Headings */}
                    <div className="p-5 bg-[#1F1F24] border border-[#2E2E36] space-y-4">
                      <h4 className="font-serif text-base text-[#D4AF37] border-b border-[#2A2A32] pb-2 font-semibold">
                        2. Catalog & Candle Showcase Headings
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-[#DCD6CB] mb-1">Jewellery Showcase Title</label>
                          <input
                            type="text"
                            value={textForm.catalogTitle}
                            onChange={(e) => setTextForm({ ...textForm, catalogTitle: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#DCD6CB] mb-1">Candle Showcase Headline</label>
                          <input
                            type="text"
                            value={textForm.candleHeadline}
                            onChange={(e) => setTextForm({ ...textForm, candleHeadline: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Jewellery Subtitle</label>
                          <input
                            type="text"
                            value={textForm.catalogSubtitle}
                            onChange={(e) => setTextForm({ ...textForm, catalogSubtitle: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Candle Section Description</label>
                          <textarea
                            rows={2}
                            value={textForm.candleSupporting}
                            onChange={(e) => setTextForm({ ...textForm, candleSupporting: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Gifting & Brand Story Texts */}
                    <div className="p-5 bg-[#1F1F24] border border-[#2E2E36] space-y-4">
                      <h4 className="font-serif text-base text-[#D4AF37] border-b border-[#2A2A32] pb-2 font-semibold">
                        3. Gifting & Brand Story Copy
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Gifting Section Headline</label>
                          <input
                            type="text"
                            value={textForm.giftingHeadline}
                            onChange={(e) => setTextForm({ ...textForm, giftingHeadline: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">About Us Section Title</label>
                          <input
                            type="text"
                            value={textForm.aboutTitle}
                            onChange={(e) => setTextForm({ ...textForm, aboutTitle: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Brand Philosophy Quote</label>
                          <input
                            type="text"
                            value={textForm.aboutQuote}
                            onChange={(e) => setTextForm({ ...textForm, aboutQuote: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] italic text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">About Story Paragraph 1</label>
                          <textarea
                            rows={3}
                            value={textForm.aboutStory1}
                            onChange={(e) => setTextForm({ ...textForm, aboutStory1: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">About Story Paragraph 2 (Dealer Authority)</label>
                          <textarea
                            rows={3}
                            value={textForm.aboutStory2}
                            onChange={(e) => setTextForm({ ...textForm, aboutStory2: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#DCD6CB] mb-1">Footer Brand Statement</label>
                          <textarea
                            rows={2}
                            value={textForm.footerBrandDescription}
                            onChange={(e) => setTextForm({ ...textForm, footerBrandDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-[#D4AF37] hover:bg-[#E6CA65] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] shadow-xl"
                      >
                        Save All Texts
                      </button>
                    </div>
                  </form>
                )}

                {/* ========================================================= */}
                {/* TAB: ORDERS LOG */}
                {/* ========================================================= */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#2E2E36] pb-4">
                      <div>
                        <h3 className="font-serif text-2xl text-[#FAF8F5]">Order Dispatch & WhatsApp Log</h3>
                        <p className="text-xs text-[#8E8B85]">Manage Cash on Delivery orders and connect directly with customers.</p>
                      </div>
                      <span className="text-xs font-mono text-[#D4AF37]">{orders.length} Total Orders</span>
                    </div>

                    <div className="space-y-4">
                      {orders.map(order => {
                        const rawPhone = (order.whatsappNumber || order.phone).replace(/[^0-9]/g, '');
                        const msg = `Hello ${order.customerName}, this is Vellura Creations regarding your Order #${order.id} for ₹${order.total.toLocaleString('en-IN')}.`;
                        const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;

                        return (
                          <div key={order.id} className="bg-[#1F1F24] border border-[#2E2E36] p-5 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A32] pb-3">
                              <div>
                                <span className="font-mono text-base font-bold text-[#D4AF37]">#{order.id}</span>
                                <span className="text-xs text-[#8E8B85] ml-3">
                                  {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <label className="text-xs text-[#8E8B85]">Status:</label>
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                  className="bg-[#141418] border border-[#3E3E48] text-xs text-[#FAF8F5] py-1 px-2.5 focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Ready to Ship">Ready to Ship</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#DCD6CB]">
                              <div>
                                <p className="text-[#8E8B85] uppercase tracking-wider text-[10px]">Customer</p>
                                <p className="font-semibold text-sm text-[#FAF8F5]">{order.customerName}</p>
                                <p>Phone: {order.phone}</p>
                                <p>WhatsApp: {order.whatsappNumber}</p>
                                {order.email && <p>Email: {order.email}</p>}
                              </div>

                              <div>
                                <p className="text-[#8E8B85] uppercase tracking-wider text-[10px]">Delivery Address</p>
                                <p>{order.address}, {order.city}, {order.state} - {order.pincode}</p>
                                {order.landmark && <p className="text-[#8E8B85]">Landmark: {order.landmark}</p>}
                                {order.notes && <p className="text-amber-300 mt-1">Note: {order.notes}</p>}
                              </div>
                            </div>

                            <div className="bg-[#141418] p-3 text-xs divide-y divide-[#222228]">
                              {order.items.map(item => (
                                <div key={item.id} className="py-1.5 flex justify-between">
                                  <span>
                                    {item.product.name} × {item.quantity}
                                    {item.selectedVariant ? ` (${item.selectedVariant})` : ''}
                                  </span>
                                  <span className="font-mono tabular-nums text-[#D4AF37]">
                                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                              <div className="font-serif text-sm">
                                <span>Total: </span>
                                <strong className="text-base text-[#D4AF37] font-mono tabular-nums">
                                  ₹{order.total.toLocaleString('en-IN')}
                                </strong>
                                <span className="text-[10px] text-[#8E8B85] ml-2">(Cash on Delivery)</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] text-xs font-medium hover:bg-[#25D366] hover:text-[#121214] flex items-center gap-1.5 transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp Customer</span>
                                </a>

                                {confirmDeleteOrderId === order.id ? (
                                  <div className="flex items-center gap-1.5 animate-in fade-in">
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        setConfirmDeleteOrderId(null);
                                        await deleteOrder(order.id);
                                        showNotification(`Order #${order.id} deleted`);
                                      }}
                                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteOrderId(null)}
                                      className="px-2 py-1 bg-[#2A2A32] text-[#DCD6CB] text-[11px] rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteOrderId(order.id)}
                                    className="p-1.5 text-[#8E8B85] hover:text-red-400"
                                    title="Delete Order"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB: INVENTORY */}
                {/* ========================================================= */}
                {activeTab === 'inventory' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#2E2E36] pb-4">
                      <h3 className="font-serif text-2xl text-[#FAF8F5]">Live Inventory & Stock Count</h3>
                      <p className="text-xs text-[#8E8B85]">Zero-stock items automatically display "Out of Stock" on storefront.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products.map(prod => (
                        <div key={prod.id} className="p-4 bg-[#1F1F24] border border-[#2E2E36] flex items-center justify-between">
                          <div>
                            <p className="font-serif text-sm font-semibold">{prod.name}</p>
                            <p className="text-[10px] text-[#8E8B85]">SKU: {prod.sku} · {prod.weight}</p>
                            <span className={`text-[10px] font-bold ${
                              prod.stockQuantity === 0 ? 'text-red-400' :
                              prod.stockQuantity <= 3 ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {prod.stockQuantity === 0 ? 'OUT OF STOCK' : `${prod.stockQuantity} in stock`}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateStock(prod.id, Math.max(0, prod.stockQuantity - 1))}
                              className="w-7 h-7 bg-[#141418] border border-[#2E2E36] text-xs hover:border-[#D4AF37]"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-mono font-bold text-xs">{prod.stockQuantity}</span>
                            <button
                              onClick={() => updateStock(prod.id, prod.stockQuantity + 1)}
                              className="w-7 h-7 bg-[#141418] border border-[#2E2E36] text-xs hover:border-[#D4AF37]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB: OFFERS */}
                {/* ========================================================= */}
                {activeTab === 'offers' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#2E2E36] pb-4">
                      <h3 className="font-serif text-2xl text-[#FAF8F5]">Promotional Offers & Coupon Codes</h3>
                      <p className="text-xs text-[#8E8B85]">Configure festival discounts and checkout coupon codes.</p>
                    </div>

                    <div className="space-y-4">
                      {offers.map(offer => (
                        <div key={offer.id} className="p-5 bg-[#1F1F24] border border-[#2E2E36] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-[#D4AF37] bg-[#141418] px-2 py-0.5 border border-[#D4AF37]/30">
                                {offer.code}
                              </span>
                              <span className="text-xs text-[#8E8B85]">({offer.badge})</span>
                            </div>
                            <h4 className="font-serif text-base text-[#FAF8F5] mt-1">{offer.title}</h4>
                            <p className="text-xs text-[#8E8B85]">{offer.subtitle}</p>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div>
                              <label className="text-[10px] text-[#8E8B85] block">Discount %</label>
                              <input
                                type="number"
                                value={offer.discountPercent}
                                onChange={(e) => updateOffer(offer.id, { discountPercent: Number(e.target.value) })}
                                className="w-16 px-2 py-1 bg-[#141418] border border-[#2E2E36] text-center"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-[#8E8B85] block">Active</label>
                              <input
                                type="checkbox"
                                checked={offer.active}
                                onChange={(e) => updateOffer(offer.id, { active: e.target.checked })}
                                className="w-4 h-4 accent-[#D4AF37] mt-1.5"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* TAB: STORE & BUSINESS DETAILS */}
                {/* ========================================================= */}
                {activeTab === 'business' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#2E2E36] pb-4">
                      <h3 className="font-serif text-2xl text-[#FAF8F5]">Business & Showroom Configuration</h3>
                      <p className="text-xs text-[#8E8B85]">Configure WhatsApp ordering number, address, and Google Maps location.</p>
                    </div>

                    <div className="bg-[#1F1F24] border border-[#2E2E36] p-6 space-y-4 max-w-2xl text-xs">
                      <div>
                        <label className="block text-[#DCD6CB] mb-1 font-semibold">
                          Store Name
                        </label>
                        <input
                          type="text"
                          value={storeSettings.storeName}
                          onChange={(e) => updateStoreSettings({ storeName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#DCD6CB] mb-1 font-semibold">
                          WhatsApp Contact Number (Order Receiving) *
                        </label>
                        <input
                          type="text"
                          value={storeSettings.whatsappNumber}
                          onChange={(e) => updateStoreSettings({ 
                            whatsappNumber: e.target.value,
                            displayPhone: e.target.value 
                          })}
                          className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                        />
                        <p className="text-[10px] text-[#8E8B85] mt-1">Default: +91 92533 42413</p>
                      </div>

                      <div>
                        <label className="block text-[#DCD6CB] mb-1 font-semibold">
                          Physical Showroom Address
                        </label>
                        <textarea
                          rows={2}
                          value={storeSettings.address}
                          onChange={(e) => updateStoreSettings({ address: e.target.value })}
                          className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#DCD6CB] mb-1 font-semibold">
                          Google Maps Directions URL
                        </label>
                        <input
                          type="text"
                          value={storeSettings.googleMapsDirectionsUrl}
                          onChange={(e) => updateStoreSettings({ googleMapsDirectionsUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#DCD6CB] mb-1 font-semibold">
                          Top Announcement Bar Text
                        </label>
                        <input
                          type="text"
                          value={storeSettings.announcementText}
                          onChange={(e) => updateStoreSettings({ announcementText: e.target.value })}
                          className="w-full px-3 py-2 bg-[#141418] border border-[#2E2E36] text-[#FAF8F5]"
                        />
                      </div>

                      <p className="text-emerald-400 text-xs">
                        ✓ All changes are synced and securely stored in Vellura showroom database.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
