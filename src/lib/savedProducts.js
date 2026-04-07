/**
 * savedProducts.js
 *
 * Utility functions for the saved_products table.
 * All operations are scoped to the signed-in user via RLS —
 * user_id is always auth.uid() on the Supabase side.
 *
 * Usage:
 *   import { fetchSavedIds, saveProduct, unsaveProduct } from '@/lib/savedProducts'
 */

import { supabase } from './supabase'

/**
 * Fetch all product IDs the current user has saved.
 * Returns a Set of product_id strings for fast lookup.
 */
export async function fetchSavedIds(userId) {
  if (!userId) return new Set()

  const { data, error } = await supabase
    .from('saved_products')
    .select('product_id')

  if (error) {
    console.error('fetchSavedIds error:', error.message)
    return new Set()
  }

  return new Set(data.map((row) => row.product_id))
}

/**
 * Save a product for the current user.
 * No-ops silently if already saved (upsert).
 */
export async function saveProduct(userId, productId) {
  if (!userId || !productId) return { error: 'Missing userId or productId' }

  const { error } = await supabase
    .from('saved_products')
    .upsert({ user_id: userId, product_id: productId })

  if (error) console.error('saveProduct error:', error.message)
  return { error }
}

/**
 * Remove a saved product for the current user.
 */
export async function unsaveProduct(userId, productId) {
  if (!userId || !productId) return { error: 'Missing userId or productId' }

  const { error } = await supabase
    .from('saved_products')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) console.error('unsaveProduct error:', error.message)
  return { error }
}
