import React, { useState, useRef } from 'react';
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
import { router } from 'expo-router';

export default function VerificationScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Go back to previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) return;
    // TODO: implement verification logic
    console.log('Verify code:', fullCode);
    router.replace('/CreateNewPassword');
  };

  const handleResend = () => {
    setCode(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
    console.log('Resend code');
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
              {/* Water drop icon */}
              <View style={styles.dropTop} />
              <View style={styles.dropBottom} />
            </View>
          </View>

          {/* App Title */}
          <Text style={styles.appTitle}>FloodTrack PH</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>📍 Nasugbu, Batangas</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Enter Verification Code</Text>
            <Text style={styles.cardSub}>
              We've sent a 6-digit code to your registered contact method
            </Text>

            {/* OTP Inputs */}
            <Text style={styles.label}>Verification Code</Text>
            <View style={styles.otpRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                  value={digit}
                  onChangeText={(text) => handleChange(text.slice(-1), index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Resend */}
            <TouchableOpacity onPress={handleResend} style={styles.resendWrap}>
              <Text style={styles.resendText}>
                Didn't receive the code?{' '}
                <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.verifyBtn, code.join('').length < 6 && styles.verifyBtnDisabled]}
              onPress={handleVerify}
              activeOpacity={0.85}
              disabled={code.join('').length < 6}
            >
              <Text style={styles.verifyBtnText}>Verify Code</Text>
            </TouchableOpacity>
          </View>
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
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },

  // Logo — water drop style
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

  // Title
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4a3b2e',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  metaRow: {
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
    marginBottom: 8,
  },
  cardSub: {
    fontSize: 13,
    color: '#9a8a7a',
    lineHeight: 20,
    marginBottom: 24,
  },

  // Label
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5a4a38',
    marginBottom: 12,
  },

  // OTP
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  otpBox: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#d8ccb8',
    borderRadius: 10,
    backgroundColor: '#f5f2ee',
    fontSize: 20,
    fontWeight: '700',
    color: '#2a1f14',
  },
  otpBoxFilled: {
    borderColor: '#9a8a7a',
    backgroundColor: '#eee8de',
  },

  // Resend
  resendWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 13,
    color: '#9a8a7a',
  },
  resendLink: {
    color: '#5a4a38',
    fontWeight: '600',
  },

  // Verify button
  verifyBtn: {
    backgroundColor: '#9a8a7a',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBtnDisabled: {
    opacity: 0.55,
  },
  verifyBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
