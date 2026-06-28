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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateNewPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid = newPassword.length >= 8 && newPassword === confirmPassword;

  const handleResetPassword = () => {
    if (!isValid) return;
    setShowSuccess(true);
  };

  const handleBackToLogin = () => {
    setShowSuccess(false);
    router.replace('/');
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
            <View style={styles.logoInner}>
              <View style={styles.dropTop} />
              <View style={styles.dropBottom} />
            </View>
          </View>

          {/* App Title */}
          <Text style={styles.appTitle}>FloodTrack PH</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={12} color="#7a6a58" />
            <Text style={styles.metaText}>Nasugbu, Batangas</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create New Password</Text>
            <Text style={styles.cardSub}>Enter a new password for your account</Text>

            {/* New Password */}
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Minimum 8 Letters"
                placeholderTextColor="#b0a090"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowNew(!showNew)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showNew ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9a8a7a"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm New Password */}
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={[
              styles.inputRow,
              confirmPassword.length > 0 && newPassword !== confirmPassword
                ? styles.inputRowError
                : null,
            ]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Minimum 8 Letters"
                placeholderTextColor="#b0a090"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9a8a7a"
                />
              </TouchableOpacity>
            </View>

            {/* Password mismatch hint */}
            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            {/* Reset Password Button */}
            <TouchableOpacity
              style={[styles.resetBtn, !isValid && styles.resetBtnDisabled]}
              onPress={handleResetPassword}
              activeOpacity={0.85}
              disabled={!isValid}
            >
              <Text style={styles.resetBtnText}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Emergency Response &amp; Flood Monitoring System{'\n'}
            © 2026 FloodTrack PH. All rights reserved.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Success Icon */}
            <View style={styles.iconWrap}>
              <Ionicons name="checkmark-circle-outline" size={52} color="#b0a090" />
            </View>

            <Text style={styles.modalTitle}>Password Reset Successful!</Text>
            <Text style={styles.modalSub}>
              Your password has been changed successfully. You can now login with your new password.
            </Text>

            {/* Back to Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleBackToLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#C9B99A',
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },

  // Logo — water drop
  logoWrap: {
    width: 72,
    height: 72,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  logoInner: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropTop: {
    width: 18,
    height: 18,
    backgroundColor: '#5bbcb0',
    borderRadius: 9,
    position: 'absolute',
    top: 0,
  },
  dropBottom: {
    width: 30,
    height: 30,
    backgroundColor: '#5bbcb0',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
  },

  // Title & Meta
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4a3b2e',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 28,
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
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a3b2e',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: '#9a8a7a',
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
    marginBottom: 16,
  },
  inputRowError: {
    borderColor: '#e63030',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#4a3b2e',
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#e63030',
    marginTop: -10,
    marginBottom: 12,
  },

  // Button
  resetBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  resetBtnDisabled: {
    opacity: 0.55,
  },
  resetBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Footer
  footer: {
    marginTop: 250,
    fontSize: 10,
    color: '#8a7a68',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0ece5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2a1f14',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSub: {
    fontSize: 13,
    color: '#9a8a7a',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  loginBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
