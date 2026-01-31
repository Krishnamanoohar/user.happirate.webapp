import { useState } from 'react';
import { lenders, Lender } from '@/Data/lenders';
import { LenderCard } from '@/components/LendarCard/LenderCard';
import { ComparisonTable } from '@/components/ComparisonTable/ComparisonTable';
import { DetailedComparison } from '@/components/DetailedComparison/DetailedComparison';
import { PreSanctionLetter } from '@/components/PreSancsionLetter/PreSanctionLetter';
import { ProvisionalOfferLetter } from '@/components/ProvisionalOfferLetter/ProvisionalOfferLetter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, Table, ArrowRight, X, Shield, Zap, Award, FileText, GitCompare } from 'lucide-react';
import React from 'react';

type ViewMode = 'grid' | 'table';
type Stage = 'compare' | 'detailed' | 'letter' | 'psl';
type MainTab = 'compare' | 'psl';

const CompareLonePage = () => {
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [stage, setStage] = useState<Stage>('compare');
  const [mainTab, setMainTab] = useState<MainTab>('compare');
  const [selectedForLetter, setSelectedForLetter] = useState<Lender | null>(null);

  const handleSelectLender = (id: string) => {
    if (selectedLenders.includes(id)) {
      setSelectedLenders(selectedLenders.filter((l) => l !== id));
    } else if (selectedLenders.length < 2) {
      setSelectedLenders([...selectedLenders, id]);
    }
  };

  const handleCompare = () => {
    if (selectedLenders.length === 2) {
      setStage('detailed');
    }
  };

  const handleSelectForLetter = (lender: Lender) => {
    setSelectedForLetter(lender);
    setStage('letter');
  };

  const handleApplyNow = (lender: Lender) => {
    setSelectedForLetter(lender);
    setStage('letter');
  };

  const handleBackToCompare = () => {
    setStage('compare');
    setSelectedForLetter(null);
  };

  const handleBackToDetailed = () => {
    setStage('detailed');
    setSelectedForLetter(null);
  };

  const handleOpenPSL = () => {
    setStage('psl');
  };

  const handleClosePSL = () => {
    setStage('compare');
  };

  const selectedLenderObjects = lenders.filter((l) => selectedLenders.includes(l.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}



      {/* Main Content */}
      <main className="container max-w-6xl py-10 md:py-14">
        {/* Main Tabs - Only show when not in detailed/letter views */}
        {(stage === 'compare' || stage === 'psl') && (
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setStage('compare')}
              
              className={cn(
                'flex items-center gap-2 px-6 py-3 !rounded-xl text-sm font-semibold transition-all',
                stage === 'compare'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold shadow-md'
                  : 'text-gray-500 hover:text-black'
              )}
            >
              <GitCompare className="w-4 h-4" />
              Compare Lenders
            </button>

            <button
              onClick={handleOpenPSL}
              style={{ fontFamily: "sans-serif" }}
              className={cn(
                'flex items-center gap-2 px-6 py-3 !rounded-xl text-sm font-semibold transition-all',
                stage === 'psl'
                  ? '  bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold shadow-md'
                  : 'text-gray-500 hover:text-black'
              )}
            >
              <FileText className="w-4 h-4" />
              Provisional Offer Letter
            </button>
          </div>
        </div>
      )}


        {stage === 'compare' && (
          <div className="animate-fade-in">

            {/* View Toggle & Selection Info */}
            <section className="mb-8 flex flex-col gap-4">
              {/* Line 1 - Center Title */}
              <div className="flex justify-center">
                <div className="bg-gray-100 px-8 py-3 rounded-2xl text-center">
                  <h2
                    style={{ fontFamily: "Denton" }}
                    className="!text-[40px] !font-bold !text-black"
                  >
                    Compare {lenders.length} Lenders
                  </h2>

                  {selectedLenders.length > 0 && (
                    <div className="mt-1">
                      <span className="bg-white/30 text-black text-xs font-semibold px-3 py-1 rounded-full">
                        {selectedLenders.length}/2 selected
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Line 2 - Right Controls */}
              <div className="flex justify-end items-center gap-4">
                {/* Grid / Table Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Grid
                  </button>

                  <button
                    onClick={() => setViewMode('table')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      viewMode === 'table'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    <Table className="w-4 h-4" />
                    Table
                  </button>
                </div>

                {/* Compare Button */}
                {selectedLenders.length === 2 && (
                  <Button
                    onClick={handleCompare}
                    className="
                      bg-gradient-to-r from-violet-500 to-purple-500
                      hover:from-violet-600 hover:to-purple-600
                      text-white font-semibold
                      px-6 h-11 !rounded-xl
                      shadow-md hover:shadow-lg
                      transition-all duration-200
                      flex items-center gap-2
                    "
                  >
                    Compare Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </section>
            {/* Selected Lenders Chips */}
            {selectedLenders.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 ">
                {selectedLenderObjects.map((lender) => (
                  <div
                    key={lender.id}
                    className="inline-flex items-center gap-2 bg-trust-light text-trust px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-600"
                  >
                    {lender.name}
                    <button
                      onClick={() => handleSelectLender(lender.id)}
                      className="hover:bg-trust/20 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Lenders Display */}
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {lenders.map((lender) => (
                  <LenderCard
                    key={lender.id}
                    lender={lender}
                    isSelected={selectedLenders.includes(lender.id)}
                    onSelect={handleSelectLender}
                    disabled={
                      selectedLenders.length >= 2 &&
                      !selectedLenders.includes(lender.id)
                    }
                    onApplyNow={handleApplyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="card-elevated overflow-hidden">
                <ComparisonTable
                  lenders={lenders}
                  selectedLenders={selectedLenders}
                  onSelectLender={handleSelectLender}
                  onApplyNow={handleApplyNow}
                />
              </div>
            )}

            {/* Help Text */}
            <p className="text-center text-muted-foreground text-sm !mt-8">
              Select any 2 lenders to compare, or click "Apply Now" to get a pre-sanction letter directly
            </p>
          </div>
        )}

        {stage === 'psl' && (
          <ProvisionalOfferLetter
            onClose={handleClosePSL}
            onApplyNow={handleApplyNow}
          />
        )}

        {stage === 'detailed' && selectedLenderObjects.length === 2 && (
          <div>
            <Button variant="ghost" onClick={handleBackToCompare} className="mb-6             !rounded-xl
            text-gray-600
            !text-[18px]          
            transition-all
            hover:bg-purple-500
            hover:text-white
            hover:shadow-md">
              ← Back to all lenders
            </Button>
            <h2 className="font-display !text-[40px] md:text-3xl !font-bold text-center mb-8">
              Side-by-Side Comparison
            </h2>
            <DetailedComparison
              lender1={selectedLenderObjects[0]}
              lender2={selectedLenderObjects[1]}
              onSelectForLetter={handleSelectForLetter}
            />
          </div>
        )}

        {stage === 'letter' && selectedForLetter && (
          <PreSanctionLetter
            lender={selectedForLetter}
            loanType={selectedLoanType}
            onBack={handleBackToCompare}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-primary-foreground/70 py-10">
        <div className="container max-w-6xl text-center">
          <p className="text-sm">
            © 2026 Happirate. All loan offers are subject to lender terms and conditions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CompareLonePage;
