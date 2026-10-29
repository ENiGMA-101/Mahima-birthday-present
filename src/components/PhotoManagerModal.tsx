import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Info } from 'lucide-react';
import { PhotoMemory, DEFAULT_PHOTOS } from '../config/content';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoMemory[];
  onUpdatePhotoSrc: (id: string, newSrc: string) => void;
  onResetPhotos: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhotoSrc,
  onResetPhotos,
}) => {
  if (!isOpen) return null;

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhotoSrc(id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmCharcoal/80 backdrop-blur-md overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-ivory rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-champagne text-warmCharcoal my-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-champagne/50 hover:bg-champagne text-deepPlum transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-champagne/40 flex items-center justify-center text-dustyRose">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-deepPlum">
              Trip Photo & Asset Manager
            </h3>
            <p className="text-xs text-mutedMauve">
              Customize or replace trip photos with your actual pictures of Mahima & Batparss
            </p>
          </div>
        </div>

        {/* Instructions Guide Card */}
        <div className="p-4 rounded-2xl bg-champagne/30 border border-champagne text-xs text-deepPlum/90 mb-6 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-deepPlum">
            <Info className="w-4 h-4 text-antiqueGold" />
            <span>How to supply your actual photos:</span>
          </div>
          <p>
            <strong>Option A (Instant in-browser):</strong> Click <em>"Upload Photo"</em> on any card below to pick your image file directly. It updates instantly across all scenes!
          </p>
          <p>
            <strong>Option B (File System):</strong> Place your photo files inside the project's <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px]">public/images/</code> folders:
          </p>
          <ul className="list-disc pl-5 font-mono text-[11px] text-warmCharcoal/80 space-y-0.5">
            <li>public/images/birthday/mahima-portrait-01.jpg</li>
            <li>public/images/batparss/group-01.jpg & candid-01.jpg</li>
            <li>public/images/sreemangal/tour-01.jpg, tea-garden-01.jpg, group-memory-01.jpg</li>
          </ul>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto p-1 scrollbar-thin">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="p-3 bg-white rounded-xl border border-champagne shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-champagne/20 relative mb-2">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-sm text-deepPlum truncate">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-mutedMauve truncate">
                  {photo.location || photo.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-champagne/50">
                <label className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-champagne/40 hover:bg-champagne text-deepPlum text-xs font-medium transition-all">
                  <Upload className="w-3.5 h-3.5 text-dustyRose" />
                  <span>Replace Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(photo.id, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-champagne flex items-center justify-between">
          <button
            onClick={onResetPhotos}
            className="flex items-center gap-1.5 text-xs text-mutedMauve hover:text-dustyRose transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Photos</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-deepPlum text-ivory text-xs font-semibold shadow hover:bg-warmCharcoal transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
