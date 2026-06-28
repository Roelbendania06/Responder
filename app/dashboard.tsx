import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.72;

const STATS = [
  { id: '1', icon: 'warning-outline', iconBg: '#fdecea', iconColor: '#e63030', value: '12', label: 'Active Alerts' },
  { id: '2', icon: 'navigate-outline', iconBg: '#f0eeec', iconColor: '#7a6a58', value: '5', label: 'Responding' },
  { id: '3', icon: 'trending-up-outline', iconBg: '#f0eeec', iconColor: '#7a6a58', value: '23', label: 'Resolved Today' },
  { id: '4', icon: 'time-outline', iconBg: '#f0eeec', iconColor: '#7a6a58', value: '8m', label: 'Avg Response' },
];

const INCIDENTS = [
  { id: '1', title: 'Flash Flood - Nasugbo', location: 'Barangay Looc, Nasugbo, Batangas', time: '5 mins ago', status: 'pending', severity: 'critical' },
  { id: '2', title: 'Road Hazard - Coastal Area', location: 'Barangay Mataas na Kahoy, Nasugbo, Batangas', time: '12 mins ago', status: 'responding', severity: 'high' },
  { id: '3', title: 'Standing Water - Town Center', location: 'Barangay Poblacion, Nasugbo, Batangas', time: '25 mins ago', status: 'pending', severity: 'medium' },
];

const QUICK_ACTIONS = [
  { id: '1', icon: 'location-outline', label: 'View Heatmap', route: '/MapHeatmap' },
  { id: '2', icon: 'navigate-outline', label: 'Dispatch Unit' },
];

const DRAWER_ITEMS = [
  { id: 'dashboard', icon: 'home-outline', label: 'Dashboard', active: true, badge: null },
  { id: 'AllIncidents', icon: 'list-outline', label: 'All Incidents', active: false, badge: null },
  { id: 'map', icon: 'map-outline', label: 'Map & Heatmap', active: false, badge: null },
  { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', active: false, badge: 5 },
  { id: 'units', icon: 'shield-outline', label: 'Active Units', active: false, badge: null },
  { id: 'settings', icon: 'settings-outline', label: 'Settings', active: false, badge: null },
];

function getSeverityStyle(severity: string) {
  switch (severity) {
    case 'critical': return { bg: '#e63030', text: '#ffffff' };
    case 'high': return { bg: '#f97316', text: '#ffffff' };
    case 'medium': return { bg: '#eab308', text: '#ffffff' };
    default: return { bg: '#9a8a7a', text: '#ffffff' };
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'responding': return { borderColor: '#9a8a7a', color: '#5a4a38' };
    default: return { borderColor: '#c0b0a0', color: '#7a6a58' };
  }
}

export default function DashboardScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.parallel([
      Animated.timing(drawerAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0.4, duration: 280, useNativeDriver: true }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnim, { toValue: -DRAWER_WIDTH, duration: 240, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0, duration: 240, useNativeDriver: true }),
    ]).start(() => setDrawerOpen(false));
  };

  const handleLogout = () => {
    closeDrawer();
    setTimeout(() => router.replace('/'), 300);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#C9B99A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="menu-outline" size={24} color="#4a3b2e" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerLogoWrap}>
            <View style={styles.headerLogoOuter}>
              <View style={styles.headerLogoCenter}>
                <View style={styles.headerLogoDot} />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.headerTitle}>FloodTrack PH</Text>
            <Text style={styles.headerSub}>Responder Portal</Text>
          </View>
        </View>

        <View style={styles.notifWrap}>
          <Ionicons name="notifications-outline" size={22} color="#4a3b2e" />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>5</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome, Responder</Text>
          <Text style={styles.welcomeDate}>{today}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: stat.iconBg }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Priority Incidents */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Priority Incidents</Text>
          <TouchableOpacity onPress={() => router.push('/AllIncidents')}>
           <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {INCIDENTS.map((incident) => {
          const severityStyle = getSeverityStyle(incident.severity);
          const statusStyle = getStatusStyle(incident.status);
          return (
            <View key={incident.id} style={styles.incidentCard}>
              <View style={styles.incidentTitleRow}>
                <Text style={styles.incidentTitle} numberOfLines={1}>{incident.title}</Text>
                <View style={[styles.severityBadge, { backgroundColor: severityStyle.bg }]}>
                  <Text style={[styles.severityText, { color: severityStyle.text }]}>{incident.severity}</Text>
                </View>
              </View>
              <View style={styles.incidentLocRow}>
                <Ionicons name="location-outline" size={12} color="#9a8a7a" />
                <Text style={styles.incidentLoc}>{incident.location}</Text>
              </View>
              <View style={styles.incidentFooter}>
                <View style={styles.incidentTimeRow}>
                  <Ionicons name="time-outline" size={12} color="#9a8a7a" />
                  <Text style={styles.incidentTime}>{incident.time}</Text>
                </View>
                <View style={[styles.statusBadge, { borderColor: statusStyle.borderColor }]}>
                  <Text style={[styles.statusText, { color: statusStyle.color }]}>{incident.status}</Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle2}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              activeOpacity={0.75}
              onPress={() => {
            if (action.route) router.push(action.route as any);
            }}
          >
            <Ionicons name={action.icon as any} size={28} color="#7a6a58" />
             <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
            ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Dark Overlay */}
      {drawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Side Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
        <SafeAreaView style={styles.drawerInner}>
          {/* User Info */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerUserRow}>
              <View style={styles.drawerAvatar}>
                <Ionicons name="person-outline" size={22} color="#7a6a58" />
              </View>
              <View style={styles.drawerUserInfo}>
                <Text style={styles.drawerUserName}>Responder</Text>
                <Text style={styles.drawerUserSub}>Unit ID: R-1024</Text>
              </View>
              <TouchableOpacity onPress={closeDrawer} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close-outline" size={22} color="#7a6a58" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.drawerMenu}>
           {DRAWER_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.drawerItem, item.active && styles.drawerItemActive]}
                activeOpacity={0.7}
                 onPress={() => {
                  if (item.id === 'AllIncidents') {
                    closeDrawer();
                    setTimeout(() => router.push('/AllIncidents' as any), 300);
                  } else if (item.id === 'map') {
                    closeDrawer();
                    setTimeout(() => router.push('/MapHeatmap' as any), 300);
                  } else {
                    closeDrawer();
                  }
                }}
            >
                <Ionicons name={item.icon as any} size={20} color={item.active ? '#4a3b2e' : '#7a6a58'} />
                <Text style={[styles.drawerItemLabel, item.active && styles.drawerItemLabelActive]}>
                  {item.label}
                </Text>
                {item.badge && (
                  <View style={styles.drawerBadge}>
                    <Text style={styles.drawerBadgeText}>{item.badge}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={20} color="#e63030" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#C9B99A' },

  // Header
 
  header: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  paddingHorizontal: 12, 
  paddingVertical: 6,      // ← binago mula 12 → 6
  paddingTop: 35,           // ← dagdag ito
  backgroundColor: '#C9B99A' 
},
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogoWrap: { width: 36, height: 36, backgroundColor: '#ffffff', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  headerLogoOuter: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#1a6b3a', alignItems: 'center', justifyContent: 'center' },
  headerLogoCenter: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#1a3a6b', alignItems: 'center', justifyContent: 'center' },
  headerLogoDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#eab308' },
  headerTitle: { fontSize: 14, fontWeight: '600', color: '#4a3b2e', lineHeight: 18 },
  headerSub: { fontSize: 11, color: '#7a6a58', lineHeight: 14 },
  notifWrap: { position: 'relative', width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  notifBadge: { position: 'absolute', top: 0, right: 0, width: 16, height: 16, borderRadius: 8, backgroundColor: '#e63030', alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { fontSize: 9, fontWeight: '700', color: '#ffffff' },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },

  // Welcome
  welcomeCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 16 },
  welcomeTitle: { fontSize: 22, fontWeight: '700', color: '#2a1f14', marginBottom: 4 },
  welcomeDate: { fontSize: 13, color: '#9a8a7a' },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: { backgroundColor: '#ffffff', borderRadius: 14, padding: 16, width: '47%', flexShrink: 1 },
  statIconWrap: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { fontSize: 28, fontWeight: '700', color: '#2a1f14', lineHeight: 32 },
  statLabel: { fontSize: 12, color: '#9a8a7a', marginTop: 4 },

  // Section
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#2a1f14' },
  sectionTitle2: { fontSize: 17, fontWeight: '700', color: '#2a1f14', marginBottom: 12, marginTop: 8 },
  viewAll: { fontSize: 13, color: '#9a8a7a' },

  // Incidents
  incidentCard: { backgroundColor: '#ffffff', borderRadius: 14, padding: 16, marginBottom: 10 },
  incidentTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 8 },
  incidentTitle: { fontSize: 15, fontWeight: '600', color: '#2a1f14', flex: 1 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  severityText: { fontSize: 11, fontWeight: '600' },
  incidentLocRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  incidentLoc: { fontSize: 12, color: '#9a8a7a', flex: 1 },
  incidentFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  incidentTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  incidentTime: { fontSize: 12, color: '#9a8a7a' },
  statusBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 },
  statusText: { fontSize: 12, fontWeight: '500' },

  // Quick Actions
  actionsGrid: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 14, paddingVertical: 24, alignItems: 'center', justifyContent: 'center', gap: 10 },
  actionLabel: { fontSize: 13, fontWeight: '500', color: '#5a4a38', textAlign: 'center' },

  // Overlay
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000', zIndex: 10 },

  // Drawer
  drawer: { position: 'absolute', top: 0, left: 0, width: DRAWER_WIDTH, height: '100%', backgroundColor: '#EDE0CE', zIndex: 20, shadowColor: '#000', shadowOffset: { width: 4, height: 0 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 16 },
  drawerInner: { flex: 1, paddingTop: 16 },
  drawerHeader: { paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#d8ccb8', marginBottom: 8 },
  drawerUserRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  drawerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ddd0bc', alignItems: 'center', justifyContent: 'center' },
  drawerUserInfo: { flex: 1 },
  drawerUserName: { fontSize: 15, fontWeight: '700', color: '#2a1f14' },
  drawerUserSub: { fontSize: 12, color: '#7a6a58', marginTop: 1 },
  drawerMenu: { flex: 1, paddingHorizontal: 12, paddingTop: 8, gap: 2 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 13, paddingHorizontal: 12, borderRadius: 12 },
  drawerItemActive: { backgroundColor: '#d8ccb8' },
  drawerItemLabel: { fontSize: 14, fontWeight: '500', color: '#7a6a58', flex: 1 },
  drawerItemLabelActive: { color: '#2a1f14', fontWeight: '600' },
  drawerBadge: { backgroundColor: '#e63030', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  drawerBadgeText: { fontSize: 10, fontWeight: '700', color: '#ffffff' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#d8ccb8' },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#e63030' },
});
