"use client"

import React, { useState, useEffect } from 'react'
import { Bell, BellOff, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOneSignal, subscribeUser, unsubscribeUser, getSubscriptionState } from '@/lib/one-signal'

export default function OneSignalNotifications() {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useOneSignal()

    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            const subscribed = await getSubscriptionState()
            setIsSubscribed(subscribed)
        }

        // Check subscription status after a delay to ensure OneSignal is loaded
        const timer = setTimeout(checkSubscriptionStatus, 2000)
        return () => clearTimeout(timer)
    }, [])

    const handleSubscribe = async () => {
        setIsLoading(true)
        try {
            await subscribeUser()
            // Check subscription status after attempting to subscribe
            setTimeout(async () => {
                const subscribed = await getSubscriptionState()
                setIsSubscribed(subscribed)
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            console.error('Subscription error:', error)
            setIsLoading(false)
        }
    }

    const handleUnsubscribe = async () => {
        setIsLoading(true)
        try {
            await unsubscribeUser()
            setIsSubscribed(false)
            setIsLoading(false)
        } catch (error) {
            console.error('Unsubscription error:', error)
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        {isSubscribed ? (
                            <Bell className="w-5 h-5 text-white" />
                        ) : (
                            <BellOff className="w-5 h-5 text-white/70" />
                        )}
                        <span className="text-white text-sm font-medium">
                            {isSubscribed ? 'Notifications On' : 'Get Notifications'}
                        </span>
                    </div>

                    <Button
                        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                        disabled={isLoading}
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 transition-colors"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isSubscribed ? (
                            "Turn Off"
                        ) : (
                            "Subscribe"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}