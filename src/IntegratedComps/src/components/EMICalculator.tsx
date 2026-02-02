import { useState, useEffect, useRef } from 'react'
import { Calculator, IndianRupee, Calendar, Percent, TrendingDown, Info, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(10.5)
  const [tenure, setTenure] = useState(5)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
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

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure])

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / (12 * 100)
    const numberOfMonths = tenure * 12

    const emiValue =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1)

    const totalPaymentValue = emiValue * numberOfMonths
    const totalInterestValue = totalPaymentValue - principal

    setEmi(Math.round(emiValue))
    setTotalInterest(Math.round(totalInterestValue))
    setTotalPayment(Math.round(totalPaymentValue))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatLakhs = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`
    }
    return formatCurrency(amount)
  }

  return (
    <section
      ref={sectionRef}
      id="emi-calculator"
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 right-0 w-1/2 h-full gradient-bg-light opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-light border border-indigo-100 mb-4">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700 font-['Denton']">EMI Calculator</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-['Denton']">
              Calculate Your <span className="gradient-text">Monthly EMI</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Plan your finances better with our easy-to-use EMI calculator. 
              Adjust the loan amount, interest rate, and tenure to find the 
              perfect repayment plan that suits your budget.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Instant EMI calculation with accurate results',
                'Compare different loan scenarios',
                'Plan your monthly budget effectively',
                'Make informed borrowing decisions',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <Card className="rounded-3xl shadow-xl shadow-indigo-200/50 border-0 overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                {/* Loan Amount */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                      <IndianRupee className="w-4 h-4 text-indigo-600" />
                      Loan Amount
                    </label>
                    <span className="text-lg font-bold text-indigo-600">
                      {formatLakhs(loanAmount)}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                      <Percent className="w-4 h-4 text-violet-600" />
                      Interest Rate
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Annual interest rate in percentage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <span className="text-lg font-bold text-violet-600">
                      {interestRate}%
                    </span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={5}
                    max={20}
                    step={0.1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Loan Tenure
                    </label>
                    <span className="text-lg font-bold text-purple-600">
                      {tenure} Years
                    </span>
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value) => setTenure(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Results */}
                <div className="gradient-bg-light rounded-2xl p-6 space-y-4">
                  <div className="text-center pb-4 border-b border-indigo-200">
                    <div className="text-sm text-slate-600 mb-1">Monthly EMI</div>
                    <div className="text-3xl lg:text-4xl font-bold gradient-text">
                      {formatCurrency(emi)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-slate-600 mb-1">
                        <TrendingDown className="w-4 h-4 text-indigo-600" />
                        Total Interest
                      </div>
                      <div className="font-bold text-slate-900">
                        {formatCurrency(totalInterest)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-600 mb-1">Total Payment</div>
                      <div className="font-bold text-slate-900">
                        {formatCurrency(totalPayment)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full gradient-bg text-white font-semibold py-5 rounded-xl mt-6 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                  Get Personalized Offers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
