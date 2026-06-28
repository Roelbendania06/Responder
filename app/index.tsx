import React, { useState } from 'react';
import { router } from 'expo-router';


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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // TODO: implement auth logic
    console.log('Sign in:', email, password);
    router.replace('/dashboard'); 
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
              {/* Colored arc segments (simplified) */}
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
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardSub}>
              Sign in to access emergency response tools
            </Text>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#b0a090"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter your password"
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

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Text style={styles.signInText}>Sign In</Text>
              
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotWrap} onPress={() => router.push('/Forgotpassword')}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signUpRow}>
              <Text style={styles.signUpBase}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/Signup')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
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
    marginTop: 40,
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
  signInBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  signInText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  forgotWrap: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotText: {
  fontSize: 13,
  color: '#9a8a7a',
  textAlign: 'center',
  marginTop: 16,      
},
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpBase: {
    fontSize: 13,
    color: '#9a8a7a',
  },
  signUpLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5a4a38',
  },

  // Footer
  footer: {
    marginTop: 190,
    fontSize: 10,
    color: '#8a7a68',
    textAlign: 'center',
    lineHeight: 16,
  },
});
