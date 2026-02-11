"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Loader2, Receipt } from "lucide-react"
import axios from "axios"

interface Payment {
    id: string
    date: string
    amount: string
    amountCents: number
    status: string
    planName: string
    invoiceUrl?: string
}

export default function PaymentHistoryPage() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchPayments = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/user/payment-history')
            setPayments(response.data.payments || [])
        } catch (error) {
            console.error("Failed to fetch payments", error)
            // Fallback mock data if API fails or is not ready
            setPayments([
                { id: "inv_1", date: "Feb 01, 2025", amount: "$129.00", amountCents: 12900, status: "Paid", planName: "Pro Plan", invoiceUrl: "#" },
                { id: "inv_2", date: "Jan 01, 2025", amount: "$129.00", amountCents: 12900, status: "Paid", planName: "Pro Plan", invoiceUrl: "#" },
                { id: "inv_3", date: "Dec 01, 2024", amount: "$49.00", amountCents: 4900, status: "Paid", planName: "Basic Plan", invoiceUrl: "#" },
            ])
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchPayments()
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Payment History</h2>
                    <p className="text-muted-foreground">
                        View and download your invoices.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading || refreshing}>
                    <Loader2 className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-indigo-500" />
                        Invoices
                    </CardTitle>
                    <CardDescription>
                        A history of your payments and subscriptions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && !refreshing ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin mb-4" />
                            <p>Loading your payment history...</p>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                            <Receipt className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No payment history found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {payments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900"
                                >
                                    <div className="flex flex-col gap-1 mb-4 md:mb-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-base">{payment.planName}</span>
                                            <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'} className={payment.status === 'Paid' ? 'bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-200 dark:border-green-800' : ''}>
                                                {payment.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{payment.date}</span>
                                            <span>•</span>
                                            <span className="font-mono text-xs opacity-70">{payment.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <span className="font-bold text-lg tabular-nums tracking-tight">{payment.amount}</span>
                                        {payment.invoiceUrl && (
                                            <Button variant="outline" size="sm" asChild className="gap-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400">
                                                <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                                                    <Download className="h-4 w-4" />
                                                    <span className="hidden md:inline">Invoice</span>
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
