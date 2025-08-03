// lib/one-signal.ts
import { useEffect } from 'react'

declare global {
    interface Window {
        OneSignal: any
    }
}

export const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || 'YOUR_ONESIGNAL_APP_ID'

export const initializeOneSignal = () => {
    if (typeof window === 'undefined') return

    window.OneSignal = window.OneSignal || []

    window.OneSignal.push(function () {
        window.OneSignal.init({
            appId: ONESIGNAL_APP_ID,
            safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
            notifyButton: {
                enable: true,
            },
            allowLocalhostAsSecureOrigin: true,
        })
    })
}

export const useOneSignal = () => {
    useEffect(() => {
        initializeOneSignal()
    }, [])
}

// Helper functions for OneSignal operations
export const subscribeUser = async () => {
    if (typeof window === 'undefined' || !window.OneSignal) return

    try {
        await window.OneSignal.showSlidedownPrompt()
    } catch (error) {
        console.error('Error subscribing user:', error)
    }
}

export const unsubscribeUser = async () => {
    if (typeof window === 'undefined' || !window.OneSignal) return

    try {
        await window.OneSignal.setSubscription(false)
    } catch (error) {
        console.error('Error unsubscribing user:', error)
    }
}

export const sendNotification = async (message: string, heading: string) => {
    if (typeof window === 'undefined' || !window.OneSignal) return

    try {
        const playerId = await window.OneSignal.getUserId()
        if (playerId) {
            // This would typically be done from your backend
            console.log('Send notification to:', playerId)
        }
    } catch (error) {
        console.error('Error sending notification:', error)
    }
}

export const getSubscriptionState = async () => {
    if (typeof window === 'undefined' || !window.OneSignal) return false

    try {
        return await window.OneSignal.isPushNotificationsEnabled()
    } catch (error) {
        console.error('Error getting subscription state:', error)
        return false
    }
}