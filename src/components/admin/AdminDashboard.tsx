import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Images,
  BookOpen,
  Mail,
  Settings,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Upload,
  Database,
  RefreshCw,
  Sparkles,
  Cake,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import { AdminStats, MemoryItem, StoryChapterItem, SiteContentMap, SiteSettingsMap } from '../../utils/api';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'memories' | 'chapters' | 'content' | 'settings'>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [chapters, setChapters] = useState<StoryChapterItem[]>([]);
  const [content, setContent] = useState<SiteContentMap>({});
  const [settings, setSettings] = useState<SiteSettingsMap>({});
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state for memories
  const [memoryFilter, setMemoryFilter] = useState<string>('all');

  // Memory Editor Modal State
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Partial<MemoryItem> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Chapter Editor Modal State
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Partial<StoryChapterItem> | null>(null);

  // Notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth fetch wrapper
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': options.body instanceof FormData ? undefined : 'application/json',
    } as any;

    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      onLogout();
      throw new Error('Session expired. Please log in again.');
    }
    return res;
  };

  // Load all initial data
  const loadData = async () => {
    setLoading(true);
    try {
      // Load stats
      const statsRes = await authFetch('/api/admin/stats');
      if (statsRes.ok) setStats(await statsRes.json());

      // Load all memories
      const memoriesRes = await authFetch('/api/admin/memories');
      if (memoriesRes.ok) setMemories(await memoriesRes.json());

      // Load chapters
      const chaptersRes = await authFetch('/api/admin/story-chapters');
      if (chaptersRes.ok) setChapters(await chaptersRes.json());

      // Load site content
      const contentRes = await fetch('/api/content');
      if (contentRes.ok) setContent(await contentRes.json());

      // Load settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) setSettings(await settingsRes.json());
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  // Handle Memory Save
  const handleSaveMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory || !editingMemory.image_url) {
      showToast('Image URL is required');
      return;
    }

    try {
      if (editingMemory.id) {
        // Update
        const res = await authFetch(`/api/admin/memories/${editingMemory.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingMemory),
        });
        if (!res.ok) throw new Error('Failed to update memory');
        showToast('Memory updated successfully');
      } else {
        // Create
        const res = await authFetch('/api/admin/memories', {
          method: 'POST',
          body: JSON.stringify(editingMemory),
        });
        if (!res.ok) throw new Error('Failed to create memory');
        showToast('Memory created successfully');
      }
      setIsMemoryModalOpen(false);
      setEditingMemory(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Operation failed');
    }
  };

  // Handle Memory Delete
  const handleDeleteMemory = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this memory?')) return;
    try {
      const res = await authFetch(`/api/admin/memories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete memory');
      showToast('Memory deleted');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete');
    }
  };

  // Handle Image File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await authFetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setEditingMemory((prev) => ({ ...prev, image_url: data.url }));
      showToast('Image uploaded successfully');
    } catch (err: any) {
      showToast(err.message || 'Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Chapter Save
  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;

    try {
      if (editingChapter.id) {
        const res = await authFetch(`/api/admin/story-chapters/${editingChapter.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingChapter),
        });
        if (!res.ok) throw new Error('Failed to update chapter');
        showToast('Chapter updated');
      } else {
        const res = await authFetch('/api/admin/story-chapters', {
          method: 'POST',
          body: JSON.stringify(editingChapter),
        });
        if (!res.ok) throw new Error('Failed to create chapter');
        showToast('Chapter created');
      }
      setIsChapterModalOpen(false);
      setEditingChapter(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Operation failed');
    }
  };

  // Handle Chapter Delete
  const handleDeleteChapter = async (id: number) => {
    if (!window.confirm('Delete this chapter?')) return;
    try {
      const res = await authFetch(`/api/admin/story-chapters/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete chapter');
      showToast('Chapter deleted');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete');
    }
  };

  // Handle Content Save
  const handleSaveContent = async (key: string, value_bn: string, value_en: string) => {
    try {
      const res = await authFetch(`/api/admin/content/${encodeURIComponent(key)}`, {
        method: 'PUT',
        body: JSON.stringify({ value_bn, value_en }),
      });
      if (!res.ok) throw new Error('Failed to update content');
      showToast(`Updated "${key}"`);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update content');
    }
  };

  // Handle Settings Save
  const handleSaveSetting = async (key: string, value: string) => {
    try {
      const res = await authFetch(`/api/admin/settings/${encodeURIComponent(key)}`, {
        method: 'PUT',
        body: JSON.stringify({ setting_value: value }),
      });
      if (!res.ok) throw new Error('Failed to update setting');
      showToast(`Setting saved`);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update setting');
    }
  };

  const filteredMemories = memories.filter((m) => {
    if (memoryFilter === 'all') return true;
    return m.category === memoryFilter;
  });

  return (
    <div className="min-h-screen bg-ivory text-warmCharcoal flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-deepPlum text-ivory px-4 py-2.5 rounded-xl shadow-2xl border border-champagne text-xs font-medium animate-fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-antiqueGold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-champagne/60 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-deepPlum text-antiqueGold flex items-center justify-center font-serif text-sm font-bold shadow-xs">
            B
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-bold text-deepPlum">
              Batparss Studio Console
            </h1>
            <p className="text-[11px] text-mutedMauve">Mahima's Birthday Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToSite}
            className="px-3 py-1.5 rounded-xl bg-champagne/40 hover:bg-champagne/70 border border-champagne text-deepPlum text-xs font-serif font-medium flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Birthday Site</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-dustyRose/15 hover:bg-dustyRose/25 text-deepPlum text-xs font-serif font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-1 space-y-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'overview'
                ? 'bg-deepPlum text-ivory shadow-xs'
                : 'bg-ivory/60 hover:bg-champagne/30 text-warmCharcoal'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-antiqueGold" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('memories')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'memories'
                ? 'bg-deepPlum text-ivory shadow-xs'
                : 'bg-ivory/60 hover:bg-champagne/30 text-warmCharcoal'
            }`}
          >
            <Images className="w-4 h-4 text-antiqueGold" />
            <span>Photo Memories</span>
          </button>

          <button
            onClick={() => setActiveTab('chapters')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'chapters'
                ? 'bg-deepPlum text-ivory shadow-xs'
                : 'bg-ivory/60 hover:bg-champagne/30 text-warmCharcoal'
            }`}
          >
            <BookOpen className="w-4 h-4 text-antiqueGold" />
            <span>Story Chapters</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'content'
                ? 'bg-deepPlum text-ivory shadow-xs'
                : 'bg-ivory/60 hover:bg-champagne/30 text-warmCharcoal'
            }`}
          >
            <Mail className="w-4 h-4 text-antiqueGold" />
            <span>Letter & Text</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'settings'
                ? 'bg-deepPlum text-ivory shadow-xs'
                : 'bg-ivory/60 hover:bg-champagne/30 text-warmCharcoal'
            }`}
          >
            <Settings className="w-4 h-4 text-antiqueGold" />
            <span>Settings</span>
          </button>

          {/* Database indicator */}
          <div className="mt-6 p-3.5 rounded-2xl bg-champagne/30 border border-champagne text-[11px] text-mutedMauve">
            <div className="flex items-center gap-2 font-serif font-bold text-deepPlum mb-1">
              <Database className="w-3.5 h-3.5 text-antiqueGold" />
              <span>Storage Engine</span>
            </div>
            <p>
              Status:{' '}
              <span className="font-semibold text-deepPlum">
                {stats?.databaseType || 'Serverless Postgres / Fallback'}
              </span>
            </p>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="lg:col-span-4 bg-ivory/80 border border-champagne/60 rounded-3xl p-6 sm:p-8 shadow-sm min-h-[600px]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-champagne/40">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-deepPlum">Overview</h2>
                  <p className="text-xs text-mutedMauve mt-0.5">Live metrics and content counters</p>
                </div>
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="p-2 rounded-xl border border-champagne hover:bg-champagne/40 text-deepPlum"
                  title="Refresh stats"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-ivory border border-champagne shadow-2xs">
                  <div className="text-xs text-mutedMauve font-serif">Total Photos</div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-deepPlum mt-1">
                    {stats?.totalMemories ?? memories.length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-ivory border border-champagne shadow-2xs">
                  <div className="text-xs text-mutedMauve font-serif">Published</div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-800 mt-1">
                    {stats?.publishedMemories ?? memories.filter((m) => m.is_published).length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-ivory border border-champagne shadow-2xs">
                  <div className="text-xs text-mutedMauve font-serif">Last Year Birthday</div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-dustyRose mt-1">
                    {stats?.birthdayMemories ?? memories.filter((m) => m.category === 'birthday_last_year').length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-ivory border border-champagne shadow-2xs">
                  <div className="text-xs text-mutedMauve font-serif">Story Chapters</div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-deepPlum mt-1">
                    {stats?.storyChapters ?? chapters.length}
                  </div>
                </div>
              </div>

              {/* Quick links & summary */}
              <div className="mt-8 p-6 rounded-2xl bg-champagne/20 border border-champagne">
                <h3 className="font-serif text-base font-bold text-deepPlum mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-antiqueGold" />
                  <span>Bilingual Readiness & Highlights</span>
                </h3>
                <p className="text-xs sm:text-sm text-warmCharcoal/80 leading-relaxed font-sans">
                  The application is fully configured with strict authentic Bengali script (বাংলা হরফ) and English translations.
                  The continuous moving photo gallery moves from right to left smoothly, and all images can be previewed in full resolution.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MEMORIES & PHOTO LIBRARY */}
          {activeTab === 'memories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-champagne/40">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-deepPlum">Photo Memories</h2>
                  <p className="text-xs text-mutedMauve mt-0.5">Manage Sreemangal tour and birthday photos</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingMemory({
                        title_bn: '',
                        title_en: '',
                        caption_bn: '',
                        caption_en: '',
                        image_url: '',
                        category: 'sreemangal',
                        location: 'শ্রীমঙ্গল',
                        memory_date: 'গত ভ্রমণ',
                        is_featured: false,
                        display_order: memories.length + 1,
                        is_published: true,
                      });
                      setIsMemoryModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-deepPlum hover:bg-warmCharcoal text-ivory text-xs font-serif font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-antiqueGold" />
                    <span>Add New Photo</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['all', 'sreemangal', 'batparss', 'spotlight', 'birthday_last_year'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMemoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full capitalize font-serif ${
                      memoryFilter === cat
                        ? 'bg-deepPlum text-ivory shadow-2xs'
                        : 'bg-ivory border border-champagne text-warmCharcoal hover:bg-champagne/30'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Memories Table / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMemories.map((m) => (
                  <div
                    key={m.id}
                    className="bg-ivory rounded-2xl border border-champagne/80 p-3 shadow-2xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-champagne/20 mb-3">
                        <img src={m.image_url} alt={m.title_en} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-deepPlum/80 text-ivory text-[10px] font-serif uppercase tracking-wider">
                          {m.category}
                        </span>
                        {!m.is_published && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-dustyRose/90 text-ivory text-[10px] font-serif">
                            Draft
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-sm font-bold text-deepPlum line-clamp-1">{m.title_en}</h4>
                      <h5 className="font-serif text-xs text-mutedMauve line-clamp-1 mt-0.5">{m.title_bn}</h5>
                      <p className="text-[11px] text-warmCharcoal/70 line-clamp-2 mt-1.5">{m.caption_en}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-champagne/40 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-mutedMauve font-serif">Order #{m.display_order}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingMemory(m);
                            setIsMemoryModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-champagne/50 text-deepPlum transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMemory(m.id)}
                          className="p-1.5 rounded-lg hover:bg-dustyRose/20 text-dustyRose transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STORY CHAPTERS */}
          {activeTab === 'chapters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-champagne/40">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-deepPlum">Story Chapters</h2>
                  <p className="text-xs text-mutedMauve mt-0.5">Narrative arcs displayed throughout the experience</p>
                </div>

                <button
                  onClick={() => {
                    setEditingChapter({
                      title_bn: '',
                      title_en: '',
                      description_bn: '',
                      description_en: '',
                      display_order: chapters.length + 1,
                      is_published: true,
                    });
                    setIsChapterModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-deepPlum hover:bg-warmCharcoal text-ivory text-xs font-serif font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-antiqueGold" />
                  <span>Add Chapter</span>
                </button>
              </div>

              <div className="space-y-4">
                {chapters.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-4 rounded-2xl bg-ivory border border-champagne flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-champagne text-deepPlum text-xs font-serif font-bold flex items-center justify-center">
                          {ch.display_order}
                        </span>
                        <h4 className="font-serif text-base font-bold text-deepPlum">{ch.title_en}</h4>
                        <span className="text-xs text-dustyRose font-serif">({ch.title_bn})</span>
                      </div>
                      <p className="text-xs text-warmCharcoal/80 mt-1">{ch.description_en}</p>
                      <p className="text-xs text-mutedMauve mt-0.5">{ch.description_bn}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingChapter(ch);
                          setIsChapterModalOpen(true);
                        }}
                        className="p-2 rounded-xl hover:bg-champagne/40 text-deepPlum"
                        title="Edit chapter"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(ch.id)}
                        className="p-2 rounded-xl hover:bg-dustyRose/20 text-dustyRose"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LETTER & SITE TEXT */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-champagne/40">
                <h2 className="font-serif text-2xl font-bold text-deepPlum">Letter & Content Editor</h2>
                <p className="text-xs text-mutedMauve mt-0.5">
                  Update authentic Bengali and English text for greetings, letter, and signatures
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(content).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-ivory border border-champagne/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-bold text-deepPlum uppercase tracking-wider">
                        {key.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-serif text-mutedMauve mb-1 font-semibold">
                          বাংলা সংস্করণ (Bengali Script)
                        </label>
                        <textarea
                          rows={val.bn.length > 80 ? 4 : 2}
                          value={val.bn}
                          onChange={(e) => {
                            const updated = { ...content, [key]: { ...val, bn: e.target.value } };
                            setContent(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-champagne bg-ivory/50 text-xs text-warmCharcoal focus:outline-hidden focus:ring-1 focus:ring-dustyRose font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-serif text-mutedMauve mb-1 font-semibold">
                          English Version
                        </label>
                        <textarea
                          rows={val.en.length > 80 ? 4 : 2}
                          value={val.en}
                          onChange={(e) => {
                            const updated = { ...content, [key]: { ...val, en: e.target.value } };
                            setContent(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-champagne bg-ivory/50 text-xs text-warmCharcoal focus:outline-hidden focus:ring-1 focus:ring-dustyRose font-sans"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        onClick={() => handleSaveContent(key, val.bn, val.en)}
                        className="px-3 py-1.5 rounded-xl bg-champagne/50 hover:bg-champagne text-deepPlum text-xs font-serif font-semibold transition-colors"
                      >
                        Save "{key}"
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-champagne/40">
                <h2 className="font-serif text-2xl font-bold text-deepPlum">Site Settings</h2>
                <p className="text-xs text-mutedMauve mt-0.5">Control exhibition animations and feature flags</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="p-4 rounded-2xl bg-ivory border border-champagne flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-deepPlum">Photo Reel Scroll Speed</h4>
                    <p className="text-xs text-mutedMauve mt-0.5">Continuous moving gallery duration (seconds)</p>
                  </div>
                  <input
                    type="number"
                    min="15"
                    max="90"
                    value={settings.reel_speed_seconds || '32'}
                    onChange={(e) => setSettings({ ...settings, reel_speed_seconds: e.target.value })}
                    onBlur={(e) => handleSaveSetting('reel_speed_seconds', e.target.value)}
                    className="w-20 px-3 py-1.5 rounded-xl border border-champagne text-xs text-center font-bold text-deepPlum"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-ivory border border-champagne flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-deepPlum">Show Last Year's Birthday Section</h4>
                    <p className="text-xs text-mutedMauve mt-0.5">Display the dedicated previous birthday keepsake section</p>
                  </div>
                  <button
                    onClick={() => {
                      const newVal = settings.show_last_year_birthday === 'true' ? 'false' : 'true';
                      setSettings({ ...settings, show_last_year_birthday: newVal });
                      handleSaveSetting('show_last_year_birthday', newVal);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-colors ${
                      settings.show_last_year_birthday === 'true'
                        ? 'bg-deepPlum text-antiqueGold'
                        : 'bg-champagne/40 text-warmCharcoal'
                    }`}
                  >
                    {settings.show_last_year_birthday === 'true' ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Memory Edit Modal */}
      {isMemoryModalOpen && editingMemory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deepPlum/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-ivory rounded-3xl border border-champagne p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/40 mb-5">
              <h3 className="font-serif text-xl font-bold text-deepPlum">
                {editingMemory.id ? 'Edit Photo Memory' : 'Add New Photo Memory'}
              </h3>
              <button
                onClick={() => setIsMemoryModalOpen(false)}
                className="p-1 rounded-full hover:bg-champagne/40"
              >
                <X className="w-5 h-5 text-warmCharcoal" />
              </button>
            </div>

            <form onSubmit={handleSaveMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-deepPlum mb-1 font-semibold">
                  Image Source (Upload or URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingMemory.image_url || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, image_url: e.target.value })}
                    placeholder="/images/sreemangal/tour-01.jpg or https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                  <label className="px-3 py-2 rounded-xl bg-champagne hover:bg-champagne/80 text-deepPlum text-xs font-serif cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                {editingMemory.image_url && (
                  <div className="mt-2 w-28 h-20 rounded-xl overflow-hidden border border-champagne bg-black/5">
                    <img src={editingMemory.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={editingMemory.title_en || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, title_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">শিরোনাম (বাংলা হরফ)</label>
                  <input
                    type="text"
                    required
                    value={editingMemory.title_bn || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, title_bn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Caption (English)</label>
                  <textarea
                    rows={2}
                    value={editingMemory.caption_en || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, caption_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">ক্যাপশন (বাংলা হরফ)</label>
                  <textarea
                    rows={2}
                    value={editingMemory.caption_bn || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, caption_bn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Category</label>
                  <select
                    value={editingMemory.category || 'sreemangal'}
                    onChange={(e) => setEditingMemory({ ...editingMemory, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  >
                    <option value="sreemangal">Sreemangal</option>
                    <option value="batparss">Batparss Circle</option>
                    <option value="spotlight">Mahima Spotlight</option>
                    <option value="birthday_last_year">Last Year Birthday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Location</label>
                  <input
                    type="text"
                    value={editingMemory.location || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, location: e.target.value })}
                    placeholder="শ্রীমঙ্গল, সিলেট"
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Display Order</label>
                  <input
                    type="number"
                    value={editingMemory.display_order ?? 1}
                    onChange={(e) =>
                      setEditingMemory({ ...editingMemory, display_order: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-deepPlum">
                  <input
                    type="checkbox"
                    checked={editingMemory.is_published ?? true}
                    onChange={(e) => setEditingMemory({ ...editingMemory, is_published: e.target.checked })}
                    className="rounded-sm text-deepPlum"
                  />
                  <span>Published to Experience</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-deepPlum">
                  <input
                    type="checkbox"
                    checked={editingMemory.is_featured ?? false}
                    onChange={(e) => setEditingMemory({ ...editingMemory, is_featured: e.target.checked })}
                    className="rounded-sm text-deepPlum"
                  />
                  <span>Featured Hero Card</span>
                </label>
              </div>

              <div className="pt-4 border-t border-champagne/40 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsMemoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-champagne text-xs font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-deepPlum text-ivory text-xs font-serif font-semibold shadow-sm"
                >
                  Save Photo Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chapter Edit Modal */}
      {isChapterModalOpen && editingChapter && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deepPlum/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-ivory rounded-3xl border border-champagne p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/40 mb-5">
              <h3 className="font-serif text-xl font-bold text-deepPlum">
                {editingChapter.id ? 'Edit Story Chapter' : 'Add Story Chapter'}
              </h3>
              <button
                onClick={() => setIsChapterModalOpen(false)}
                className="p-1 rounded-full hover:bg-champagne/40"
              >
                <X className="w-5 h-5 text-warmCharcoal" />
              </button>
            </div>

            <form onSubmit={handleSaveChapter} className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingChapter.title_en || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, title_en: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">শিরোনাম (বাংলা হরফ)</label>
                <input
                  type="text"
                  required
                  value={editingChapter.title_bn || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, title_bn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">Description (English)</label>
                <textarea
                  rows={3}
                  value={editingChapter.description_en || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, description_en: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-deepPlum mb-1 font-semibold">বিবরণ (বাংলা হরফ)</label>
                <textarea
                  rows={3}
                  value={editingChapter.description_bn || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, description_bn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-champagne text-xs bg-ivory/50"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsChapterModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-champagne text-xs font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-deepPlum text-ivory text-xs font-serif font-semibold"
                >
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
