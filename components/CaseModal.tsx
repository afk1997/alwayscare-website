import React, { useEffect, useState } from 'react';
import { X, MapPin, Camera, Video, User, ExternalLink } from 'lucide-react';
import { LiveCase } from '../types';
import { formatTimeAgo, formatStatus, getGoogleDriveThumbnailUrl } from '../utils';

interface CaseModalProps {
  liveCase: LiveCase;
  onClose: () => void;
}

const conditionClasses = (condition: string): string => {
  const c = condition.toUpperCase();
  if (c === 'CRITICAL' || c === 'SEVERE') return 'bg-[#FDEAEA] text-[#B7312C] border-[#F5C5C3]';
  if (c === 'MODERATE' || c === 'MILD') return 'bg-[#FEF3E7] text-[#B8650A] border-[#FDDBB8]';
  return 'bg-[#E8F0E9] text-[#5F8A65] border-[#C5DBC8]';
};

const statusClasses = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-[#E8F0E9] text-[#5F8A65] border-[#C5DBC8]';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-[#FEF3E7] text-[#B8650A] border-[#FDDBB8]';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-[#F5F0EB] text-[#78716C] border-[#E8E0D8]';
  return 'bg-[#FEF7ED] text-[#B8650A] border-[#F9E8C9]';
};

const statusDotClass = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-[#5F8A65]';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-[#B8650A] animate-pulse';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-[#A8A29E]';
  return 'bg-[#B8650A]';
};

const recommendationClasses = (rec: string): string => {
  const r = rec.toUpperCase();
  if (r === 'PROPER_FOOD_AND_CARE') return 'bg-[#E8F0E9] text-[#5F8A65]';
  if (r === 'FOLLOW_UP_NEEDED') return 'bg-[#FEF3E7] text-[#B8650A]';
  if (r === 'REFERRED_TO_HOSPITAL') return 'bg-[#FDEAEA] text-[#B7312C]';
  return 'bg-[#F5F0EB] text-[#57534E]';
};

const formatRecommendation = (rec: string): string => {
  return rec.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const PreTreatmentImage: React.FC<{ url: string; caseId: string }> = ({ url, caseId }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = getGoogleDriveThumbnailUrl(url, 600);

  if (imgError || !thumbnailUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FEF3E7] text-[#B8650A] border border-[#F9E8C9] text-sm font-medium hover:bg-[#FEF3E7] transition-colors"
      >
        <Camera size={14} /> View Pre-Treatment Photo
      </a>
    );
  }

  return (
    <div className="space-y-2">
      <a href={url} target="_blank" rel="noreferrer" className="block relative group/img">
        <img
          src={thumbnailUrl}
          alt={`Pre-treatment photo for Case #${caseId}`}
          onError={() => setImgError(true)}
          className="w-full rounded-lg object-cover max-h-[300px] bg-[#E8E0D8]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
          <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-[#44403C] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <ExternalLink size={12} /> Open full size
          </span>
        </div>
      </a>
    </div>
  );
};

const CaseModal: React.FC<CaseModalProps> = ({ liveCase, onClose }) => {
  // Escape key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasMedicalData = liveCase.doctorObservation || liveCase.treatmentGiven || liveCase.medicationDosage || liveCase.affectedBodyPart;
  const hasPhotos = liveCase.preTreatmentPhoto || liveCase.postTreatmentPhotosAndVideosFolderURL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modalIn 200ms ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E8E0D8] p-5 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#292524]">Case #{liveCase.caseId}</h2>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${conditionClasses(liveCase.condition)}`}>
                  {liveCase.condition}
                </span>
                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-medium ${statusClasses(liveCase.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(liveCase.status)}`}></span>
                  {formatStatus(liveCase.status)}
                </span>
              </div>
              <div className="text-sm text-[#78716C] mt-1">{liveCase.animalType} &bull; {liveCase.siteName}</div>
              <div className="text-xs text-[#A8A29E] mt-1">
                {formatTimeAgo(liveCase.caseDate)} &bull; {formatDateTime(liveCase.caseDate)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#F5F0EB] transition-colors text-[#A8A29E] hover:text-[#57534E] shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Rescue Info */}
          <div className="bg-[#FAF7F4] rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-semibold text-[#44403C] mb-2">Rescue Info</h3>
            {liveCase.address && (
              <div className="flex items-start gap-2 text-sm text-[#57534E]">
                <MapPin size={14} className="text-[#A8A29E] mt-0.5 shrink-0" />
                <span>{liveCase.address}</span>
              </div>
            )}
            {liveCase.informerName && (
              <div className="flex items-start gap-2 text-sm text-[#57534E]">
                <User size={14} className="text-[#A8A29E] mt-0.5 shrink-0" />
                <span>Reported by: {liveCase.informerName}</span>
              </div>
            )}
            {liveCase.caseType && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  liveCase.caseType === 'FOLLOW_UP_CASE'
                    ? 'bg-[#FEF3E7] text-[#B8650A] border border-[#F9E8C9]'
                    : 'bg-[#FEF3E7] text-[#B8650A] border border-[#F9E8C9]'
                }`}>
                  {liveCase.caseType === 'FOLLOW_UP_CASE' ? 'Follow-up Case' : 'New Case'}
                </span>
              </div>
            )}
          </div>

          {/* Medical Details (conditional) */}
          {hasMedicalData && (
            <div className="bg-[#FAF7F4] rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-[#44403C]">Medical Details</h3>

              {liveCase.doctorObservation && (
                <div>
                  <p className="text-xs text-[#A8A29E] font-medium mb-0.5">Observation</p>
                  <p className="text-sm text-[#44403C]">{liveCase.doctorObservation}</p>
                </div>
              )}

              {liveCase.affectedBodyPart && (
                <div>
                  <p className="text-xs text-[#A8A29E] font-medium mb-0.5">Affected Area</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#E8E0D8] text-[#57534E] font-medium">
                    {liveCase.affectedBodyPart}
                  </span>
                </div>
              )}

              {liveCase.treatmentGiven && (
                <div>
                  <p className="text-xs text-[#A8A29E] font-medium mb-0.5">Treatment</p>
                  <p className="text-sm text-[#44403C]">{liveCase.treatmentGiven}</p>
                </div>
              )}

              {liveCase.medicationDosage && (
                <div>
                  <p className="text-xs text-[#A8A29E] font-medium mb-1">Medication</p>
                  <div className="font-mono text-xs text-[#292524] bg-white rounded-lg p-3 border border-[#E8E0D8] space-y-1">
                    {liveCase.medicationDosage.split('\n').map((line, i) => (
                      <div key={i}>{line.trim()}</div>
                    ))}
                  </div>
                </div>
              )}

              {liveCase.recommendation && liveCase.recommendation !== 'NO' && (
                <div>
                  <p className="text-xs text-[#A8A29E] font-medium mb-0.5">Recommendation</p>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${recommendationClasses(liveCase.recommendation)}`}>
                    {formatRecommendation(liveCase.recommendation)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Photos & Video (conditional) */}
          {hasPhotos && (
            <div className="bg-[#FAF7F4] rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-[#44403C]">Photos & Video</h3>
              {liveCase.preTreatmentPhoto && (
                <PreTreatmentImage url={liveCase.preTreatmentPhoto} caseId={liveCase.caseId} />
              )}
              {liveCase.postTreatmentPhotosAndVideosFolderURL && (
                <a
                  href={liveCase.postTreatmentPhotosAndVideosFolderURL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FEF3E7] text-[#B8650A] border border-[#F9E8C9] text-sm font-medium hover:bg-[#FEF3E7] transition-colors"
                >
                  <Video size={14} /> View Post-Treatment Photos & Videos
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CaseModal;
