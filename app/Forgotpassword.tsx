import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    // TODO: implement password reset logic
    console.log('Send reset link to:', email);
     router.push('/Verification'); 
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#C9B99A" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoWrap}>
            <View style={styles.logoOuter}>
              <View style={styles.arcRed} />
              <View style={styles.arcGreen} />
              <View style={styles.arcBlue} />
              <View style={styles.logoCenter}>
                <View style={styles.logoDot} />
              </View>
            </View>
          </View>

          {/* App Title */}
          <Text style={styles.appTitle}>FloodTrack PH</Text>

          {/* Meta info */}
          <View style={styles.metaRow}>
            <Ionicons name="shield-outline" size={12} color="#7a6a58" />
            <Text style={styles.metaText}>Responder Portal</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={12} color="#7a6a58" />
            <Text style={styles.metaText}>Nasugbu, Batangas</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Back + Title */}
            <View style={styles.titleRow}>
              <TouchableOpacity
                onPress={() => router.back()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="arrow-back-outline" size={20} color="#4a3b2e" />
              </TouchableOpacity>
              <Text style={styles.cardTitle}>Reset Password</Text>
            </View>

            <Text style={styles.cardSub}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            {/* Email Address */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color="#9a8a7a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#b0a090"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Send Reset Link Button */}
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleSendResetLink}
              activeOpacity={0.85}
            >
              <Text style={styles.resetBtnText}>Send Reset Link</Text>
            </TouchableOpacity>

            {/* Back to Sign In */}
            <TouchableOpacity
              style={styles.backWrap}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Emergency Response &amp; Flood Monitoring System{'\n'}
            © 2026 FloodTrack PH. All rights reserved.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#C9B99A',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },

  // Logo
  logoWrap: {
    width: 72,
    height: 72,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  logoOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    borderColor: '#1a6b3a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  arcRed: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e63030',
  },
  arcGreen: {
    position: 'absolute',
    bottom: -2,
    right: 6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1a6b3a',
  },
  arcBlue: {
    position: 'absolute',
    bottom: -2,
    left: 6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1a3a6b',
  },
  logoCenter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1a3a6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eab308',
  },

  // Title & Meta
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4a3b2e',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  metaText: {
    fontSize: 12,
    color: '#7a6a58',
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    marginTop: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4a3b2e',
  },
  cardSub: {
    fontSize: 13,
    color: '#9a8a7a',
    lineHeight: 20,
    marginBottom: 24,
  },

  // Form
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5a4a38',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f2ee',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e0d6',
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#4a3b2e',
    paddingVertical: 0,
  },

  // Buttons
  resetBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  backWrap: {
    alignItems: 'center',
    marginTop: 16,
  },
  backText: {
    fontSize: 13,
    color: '#9a8a7a',
  },

  // Footer
  footer: {
    marginTop: 300,
    fontSize: 10,
    color: '#8a7a68',
    textAlign: 'center',
    lineHeight: 16,
  },
});
