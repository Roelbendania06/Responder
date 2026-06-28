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

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [unitId, setUnitId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateAccount = () => {
    // TODO: implement registration logic
    console.log({ fullName, username, email, unitId, password, confirmPassword });
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
            <Text style={styles.cardTitle}>Create Account</Text>
            <Text style={styles.cardSub}>Register as an emergency responder</Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#b0a090"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Username */}
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Choose a username"
                placeholderTextColor="#b0a090"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Email Address */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
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

            {/* Unit ID */}
            <Text style={styles.label}>Unit ID</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="e.g., R-1024"
                placeholderTextColor="#b0a090"
                value={unitId}
                onChangeText={setUnitId}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Create a password"
                placeholderTextColor="#b0a090"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9a8a7a"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirm your password"
                placeholderTextColor="#b0a090"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9a8a7a"
                />
              </TouchableOpacity>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              style={styles.createBtn}
              onPress={handleCreateAccount}
              activeOpacity={0.85}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.createBtnText}>Create Account</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInRow}>
              <Text style={styles.signInBase}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4a3b2e',
    marginBottom: 4,
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
  input: {
    flex: 1,
    fontSize: 14,
    color: '#4a3b2e',
    paddingVertical: 0,
  },

  // Buttons
  createBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  createBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signInBase: {
    fontSize: 13,
    color: '#9a8a7a',
  },
  signInLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5a4a38',
  },

  // Footer
  footer: {
    marginTop: 28,
    fontSize: 10,
    color: '#8a7a68',
    textAlign: 'center',
    lineHeight: 16,
  },
});
