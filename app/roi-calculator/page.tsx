'use client'

import { useState } from 'react'
import { Calculator, DollarSign, Clock, TrendingUp, Users, Zap, CheckCircle, ArrowRight, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'

export default function ROICalculatorPage() {
  const [monthlyTransactions, setMonthlyTransactions] = useState(10000)
  const [averageOrderValue, setAverageOrderValue] = useState(150)
  const [currentConversionRate, setCurrentConversionRate] = useState(2.5)
  const [developerHours, setDeveloperHours] = useState(160)
  const [showResults, setShowResults] = useState(false)

  // Calculations
  const currentMonthlyRevenue = monthlyTransactions * averageOrderValue * (currentConversionRate / 100)
  const improvedConversionRate = Math.min(currentConversionRate * 1.47, 100) // 47% improvement
  const improvedMonthlyRevenue = monthlyTransactions * averageOrderValue * (improvedConversionRate / 100)
  const additionalMonthlyRevenue = improvedMonthlyRevenue - currentMonthlyRevenue
  const yearlyAdditionalRevenue = additionalMonthlyRevenue * 12

  const developerCostSaved = developerHours * 150 // $150/hour average
  const maintenanceHoursSaved = 20 * 150 * 12 // 20 hours/month maintenance
  const totalCostSavings = developerCostSaved + maintenanceHoursSaved

  const encloseFees = improvedMonthlyRevenue * 0.005 * 12 // 0.5% of revenue
  const netAnnualBenefit = yearlyAdditionalRevenue + totalCostSavings - encloseFees
  const roi = ((netAnnualBenefit / encloseFees) * 100).toFixed(0)
  const paybackPeriod = (encloseFees / (netAnnualBenefit / 12)).toFixed(1)

  const handleCalculate = () => {
    setShowResults(true)
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              ROI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how much revenue you're leaving on the table with traditional payment processing
            </p>
          </div>

          {/* Calculator Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Business Metrics</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Monthly Transactions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Transactions
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={monthlyTransactions}
                    onChange={(e) => setMonthlyTransactions(Number(e.target.value))}
                    className="w-32"
                  />
                  <Slider
                    value={[monthlyTransactions]}
                    onValueChange={(value) => setMonthlyTransactions(value[0])}
                    max={100000}
                    min={100}
                    step={100}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Number of transactions per month</p>
              </div>

              {/* Average Order Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Order Value ($)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                    className="w-32"
                  />
                  <Slider
                    value={[averageOrderValue]}
                    onValueChange={(value) => setAverageOrderValue(value[0])}
                    max={1000}
                    min={10}
                    step={5}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Average transaction amount</p>
              </div>

              {/* Current Conversion Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Conversion Rate (%)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={currentConversionRate}
                    onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                    className="w-32"
                    step="0.1"
                  />
                  <Slider
                    value={[currentConversionRate * 10]}
                    onValueChange={(value) => setCurrentConversionRate(value[0] / 10)}
                    max={100}
                    min={5}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Percentage of visitors who complete purchase</p>
              </div>

              {/* Developer Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Developer Hours for Integration
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={developerHours}
                    onChange={(e) => setDeveloperHours(Number(e.target.value))}
                    className="w-32"
                  />
                  <Slider
                    value={[developerHours]}
                    onValueChange={(value) => setDeveloperHours(value[0])}
                    max={500}
                    min={40}
                    step={10}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Hours typically spent on payment integration</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={handleCalculate}
                className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Calculate Your ROI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div id="results" className="space-y-8 animate-in slide-in-from-bottom duration-500">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${(yearlyAdditionalRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Additional Annual Revenue</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <Clock className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${(totalCostSavings / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Development Cost Saved</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <BarChart className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {roi}%
                  </div>
                  <div className="text-sm text-gray-600">Return on Investment</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <Zap className="h-8 w-8 text-yellow-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {paybackPeriod} mo
                  </div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gradient-to-r from-white to-indigo-50 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Detailed ROI Breakdown</h3>

                <div className="space-y-6">
                  {/* Revenue Impact */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Revenue Impact
                    </h4>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Monthly Revenue</span>
                        <span className="font-medium">${currentMonthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projected Monthly Revenue (47% conversion boost)</span>
                        <span className="font-medium text-green-600">${improvedMonthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span className="text-gray-900">Additional Monthly Revenue</span>
                        <span className="text-green-600">+${additionalMonthlyRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Savings */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-600" />
                      Cost Savings
                    </h4>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Development Cost Avoided</span>
                        <span className="font-medium">${developerCostSaved.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Maintenance Cost Avoided</span>
                        <span className="font-medium">${maintenanceHoursSaved.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span className="text-gray-900">Total Cost Savings</span>
                        <span className="text-blue-600">${totalCostSavings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment & Return */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                      Investment & Return
                    </h4>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Enclose.AI Fees (0.5% of revenue)</span>
                        <span className="font-medium">${encloseFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Annual Benefit</span>
                        <span className="font-medium">${(yearlyAdditionalRevenue + totalCostSavings).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span className="text-gray-900">Net Annual Benefit</span>
                        <span className="text-green-600">${netAnnualBenefit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Additional Benefits Not Included in ROI</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Reduced Cart Abandonment</p>
                      <p className="text-sm text-gray-600">89% reduction in checkout abandonment rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Global Payment Support</p>
                      <p className="text-sm text-gray-600">Accept 135+ currencies without additional setup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Fraud Prevention</p>
                      <p className="text-sm text-gray-600">AI-powered fraud detection saves thousands monthly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Instant Setup</p>
                      <p className="text-sm text-gray-600">Go live in 2 minutes vs. 2-3 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Zero Maintenance</p>
                      <p className="text-sm text-gray-600">No updates, patches, or security audits required</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">24/7 Support</p>
                      <p className="text-sm text-gray-600">Expert support team available around the clock</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Capture Your ${(yearlyAdditionalRevenue / 1000).toFixed(0)}K Annual Opportunity?
                </h3>
                <p className="text-xl mb-8 text-indigo-100">
                  Join thousands of businesses already growing with Enclose.AI
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="px-8 bg-white text-indigo-600 hover:bg-gray-100">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-indigo-200">
                  ✓ 14-day free trial &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Cancel anytime
                </p>
              </div>

              {/* Disclaimer */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  * ROI calculations based on average customer results. Actual results may vary depending on your specific business model and implementation.
                  The 47% conversion improvement is based on aggregate customer data from 2024.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
  )
}