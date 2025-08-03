// hooks/use-one-signal.ts
"use client"

import { useState, useEffect, useCallback } from 'react'

declare global {
    interface Window {
        OneSignal: any
    }
}

interface OneSignalState {
    isInitialized: boolean
    isSubscribed: boolean
    userId: string | null
    isPushSupported: boolean
}

export const useOneSignalState = () => {
    const [state, setState] = useState<OneSignalState>({
        isInitialized: false,
        isSubscribed: false,
        userId: null,
        isPushSupported: false
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const initOneSignal = async () => {
            try {
                // Wait for OneSignal to be ready
                await new Promise((resolve) => {
                    if (window.OneSignal) {
                        window.OneSignal.push(() => resolve(true))
                    } else {
                        const checkOneSignal = setInterval(() => {
                            if (window.OneSignal) {
                                clearInterval(checkOneSignal)
                                window.OneSignal.push(() => resolve(true))
                            }
                        }, 100)
                    }
                })

                // Get initial state
                const [isSubscribed, userId, isPushSupported] = await Promise.all([
                    window.OneSignal.isPushNotificationsEnabled(),
                    window.OneSignal.getUserId(),
                    window.OneSignal.isPushNotificationsSupported()
                ])

                setState({
                    isInitialized: true,
                    isSubscribed,
                    userId,
                    isPushSupported
                })

                // Listen for subscription changes
                window.OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
                    setState(prev => ({ ...prev, isSubscribed }))
                })

            } catch (error) {
                console.error('OneSignal initialization error:', error)
            }
        }

        initOneSignal()
    }, [])

    const subscribe = useCallback(async () => {
        if (!state.isInitialized || !window.OneSignal) return false

        setIsLoading(true)
        try {
            await window.OneSignal.showSlidedownPrompt()
            const isSubscribed = await window.OneSignal.isPushNotificationsEnabled()
            const userId = await window.OneSignal.getUserId()

            setState(prev => ({ ...prev, isSubscribed, userId }))
            return isSubscribed
        } catch (error) {
            console.error('Subscription error:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [state.isInitialized])

    const unsubscribe = useCallback(async () => {
        if (!state.isInitialized || !window.OneSignal) return false

        setIsLoading(true)
        try {
            await window.OneSignal.setSubscription(false)
            setState(prev => ({ ...prev, isSubscribed: false }))
            return true
        } catch (error) {
            console.error('Unsubscription error:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [state.isInitialized])

    const sendTag = useCallback(async (key: string, value: string) => {
        if (!state.isInitialized || !window.OneSignal) return false

        try {
            await window.OneSignal.sendTag(key, value)
            return true
        } catch (error) {
            console.error('Send tag error:', error)
            return false
        }
    }, [state.isInitialized])

    return {
        ...state,
        isLoading,
        subscribe,
        unsubscribe,
        sendTag
    }
}