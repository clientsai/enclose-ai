export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      enclose_users: {
        Row: {
          id: string
          email: string
          name: string
          password_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          password_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          password_hash?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stripe_accounts: {
        Row: {
          id: string
          user_id: string
          stripe_account_id: string
          access_token: string | null
          refresh_token: string | null
          livemode: boolean
          connected_at: string
          updated_at: string
          account_details: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          stripe_account_id: string
          access_token?: string | null
          refresh_token?: string | null
          livemode?: boolean
          connected_at?: string
          updated_at?: string
          account_details?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          stripe_account_id?: string
          access_token?: string | null
          refresh_token?: string | null
          livemode?: boolean
          connected_at?: string
          updated_at?: string
          account_details?: Json | null
        }
      }
      payment_links: {
        Row: {
          id: string
          user_id: string
          stripe_payment_link_id: string
          url: string
          product_name: string
          product_description: string | null
          amount: number
          currency: string
          active: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
          expires_at: string | null
          click_count: number
          conversion_count: number
        }
        Insert: {
          id?: string
          user_id: string
          stripe_payment_link_id: string
          url: string
          product_name: string
          product_description?: string | null
          amount: number
          currency?: string
          active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          click_count?: number
          conversion_count?: number
        }
        Update: {
          id?: string
          user_id?: string
          stripe_payment_link_id?: string
          url?: string
          product_name?: string
          product_description?: string | null
          amount?: number
          currency?: string
          active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          click_count?: number
          conversion_count?: number
        }
      }
      payments: {
        Row: {
          id: string
          payment_link_id: string | null
          stripe_payment_intent_id: string | null
          stripe_checkout_session_id: string | null
          amount: number
          currency: string | null
          status: string | null
          customer_email: string | null
          customer_name: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          payment_link_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          amount: number
          currency?: string | null
          status?: string | null
          customer_email?: string | null
          customer_name?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          payment_link_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          amount?: number
          currency?: string | null
          status?: string | null
          customer_email?: string | null
          customer_name?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          key_hash: string
          key_prefix: string
          name: string | null
          permissions: Json
          last_used: string | null
          created_at: string
          revoked_at: string | null
          active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          key_hash: string
          key_prefix: string
          name?: string | null
          permissions?: Json
          last_used?: string | null
          created_at?: string
          revoked_at?: string | null
          active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          key_hash?: string
          key_prefix?: string
          name?: string | null
          permissions?: Json
          last_used?: string | null
          created_at?: string
          revoked_at?: string | null
          active?: boolean
        }
      }
      webhook_events: {
        Row: {
          id: string
          stripe_event_id: string | null
          event_type: string
          payload: Json | null
          processed: boolean
          error_message: string | null
          created_at: string
          processed_at: string | null
        }
        Insert: {
          id?: string
          stripe_event_id?: string | null
          event_type: string
          payload?: Json | null
          processed?: boolean
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          stripe_event_id?: string | null
          event_type?: string
          payload?: Json | null
          processed?: boolean
          error_message?: string | null
          created_at?: string
          processed_at?: string | null
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string
          event_type: string
          payment_link_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: string
          payment_link_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: string
          payment_link_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          user_id: string
          stripe_product_id: string | null
          name: string
          description: string | null
          price: number | null
          currency: string
          active: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_product_id?: string | null
          name: string
          description?: string | null
          price?: number | null
          currency?: string
          active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_product_id?: string | null
          name?: string
          description?: string | null
          price?: number | null
          currency?: string
          active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_link_click_count: {
        Args: {
          link_id: string
        }
        Returns: void
      }
      increment_link_conversion_count: {
        Args: {
          link_id: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}