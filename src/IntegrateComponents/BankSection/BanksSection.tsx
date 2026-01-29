import { useState, useRef, useEffect } from 'react'
import { Building2, Search, Filter, ChevronLeft, ChevronRight, Star, Percent, Clock, Shield, ArrowRight, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Bank {
  id: number
  name: string
  logo: string
  interestRate: number
  maxAmount: string
  tenure: string
  processingFee: string
  rating: number
  tags: string[]
  color: string
  featured?: boolean
}

const banks: Bank[] = [
  {
    id: 1,
    name: 'Bank of Baroda',
    logo: 'BOB',
    interestRate: 10.1,
    maxAmount: '₹50 Lakhs',
    tenure: 'Up to 7 years',
    processingFee: '1%',
    rating: 4.5,
    tags: ['Low Interest', 'Quick Approval'],
    color: 'from-orange-400 to-red-500',
    featured: true,
  },
  {
    id: 2,
    name: 'IndusInd Bank',
    logo: 'IND',
    interestRate: 11.3,
    maxAmount: '₹40 Lakhs',
    tenure: 'Up to 5 years',
    processingFee: '1.5%',
    rating: 4.3,
    tags: ['Flexible EMI'],
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 3,
    name: 'ICICI Bank',
    logo: 'ICI',
    interestRate: 11.2,
    maxAmount: '₹45 Lakhs',
    tenure: 'Up to 6 years',
    processingFee: '1.2%',
    rating: 4.6,
    tags: ['Digital Process', 'Instant Approval'],
    color: 'from-amber-400 to-orange-500',
    featured: true,
  },
  {
    id: 4,
    name: 'HDFC Bank',
    logo: 'HDF',
    interestRate: 10.5,
    maxAmount: '₹60 Lakhs',
    tenure: 'Up to 8 years',
    processingFee: '0.99%',
    rating: 4.7,
    tags: ['Best Rate', 'Trusted'],
    color: 'from-blue-500 to-indigo-600',
    featured: true,
  },
  {
    id: 5,
    name: 'SBI Bank',
    logo: 'SBI',
    interestRate: 9.8,
    maxAmount: '₹75 Lakhs',
    tenure: 'Up to 10 years',
    processingFee: '0.5%',
    rating: 4.8,
    tags: ['Lowest Rate', 'Government'],
    color: 'from-green-500 to-emerald-600',
    featured: true,
  },
  {
    id: 6,
    name: 'Axis Bank',
    logo: 'AXI',
    interestRate: 10.75,
    maxAmount: '₹55 Lakhs',
    tenure: 'Up to 7 years',
    processingFee: '1%',
    rating: 4.4,
    tags: ['Pre-approved'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 7,
    name: 'Kotak Mahindra',
    logo: 'KOT',
    interestRate: 11.5,
    maxAmount: '₹35 Lakhs',
    tenure: 'Up to 5 years',
    processingFee: '1.8%',
    rating: 4.2,
    tags: ['Zero Foreclosure'],
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 8,
    name: 'Punjab National',
    logo: 'PNB',
    interestRate: 10.25,
    maxAmount: '₹40 Lakhs',
    tenure: 'Up to 6 years',
    processingFee: '0.75%',
    rating: 4.3,
    tags: ['Low Fee'],
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 9,
    name: 'Canara Bank',
    logo: 'CAN',
    interestRate: 10.4,
    maxAmount: '₹45 Lakhs',
    tenure: 'Up to 7 years',
    processingFee: '0.8%',
    rating: 4.1,
    tags: ['Easy Documentation'],
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 10,
    name: 'Union Bank',
    logo: 'UBI',
    interestRate: 10.35,
    maxAmount: '₹50 Lakhs',
    tenure: 'Up to 8 years',
    processingFee: '0.9%',
    rating: 4.0,
    tags: ['Special Offers'],
    color: 'from-indigo-500 to-purple-600',
  },
]

export default function BanksSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('interest')
  const [filterFeatured, setFilterFeatured] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredBanks = banks
    .filter((bank) => {
      const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFeatured = filterFeatured ? bank.featured : true
      return matchesSearch && matchesFeatured
    })
    .sort((a, b) => {
      if (sortBy === 'interest') return a.interestRate - b.interestRate
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'amount') return parseInt(b.maxAmount.replace(/[^0-9]/g, '')) - parseInt(a.maxAmount.replace(/[^0-9]/g, ''))
      return 0
    })

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      checkScrollButtons()
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="banks"
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 mb-4">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Partner Banks</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Compare <span className="gradient-text">20+ Banks</span>
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl">
              Find the best loan offers from India's top banks and financial institutions
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 lg:w-56 bg-white border-slate-200 focus:border-indigo-300"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interest">Lowest Interest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="amount">Max Amount</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={filterFeatured ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterFeatured(!filterFeatured)}
              className={filterFeatured ? 'gradient-bg' : 'border-slate-200'}
            >
              <Filter className="w-4 h-4 mr-1" />
              Featured
            </Button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredBanks.map((bank, index) => (
              <div
                key={bank.id}
                className={`flex-shrink-0 w-80 snap-start transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bank.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {bank.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{bank.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-sm text-slate-500">{bank.rating}</span>
                        </div>
                      </div>
                    </div>
                    {bank.featured && (
                      <Badge className="gradient-bg text-white text-xs">Featured</Badge>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bank.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Percent className="w-4 h-4" />
                        <span className="text-sm">Interest Rate</span>
                      </div>
                      <span className="font-bold text-slate-900">{bank.interestRate}%</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Wallet className="w-4 h-4" />
                        <span className="text-sm">Max Amount</span>
                      </div>
                      <span className="font-bold text-slate-900">{bank.maxAmount}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Tenure</span>
                      </div>
                      <span className="font-bold text-slate-900">{bank.tenure}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Processing Fee</span>
                      </div>
                      <span className="font-bold text-slate-900">{bank.processingFee}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full gradient-bg text-white font-semibold py-5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-indigo-200 text-indigo-600 font-semibold px-8 py-5 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
          >
            View All Banks
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
