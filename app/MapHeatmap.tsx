import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.72;

// ─── Nasugbu, Batangas coordinates ────────────────────
const NASUGBU_REGION = {
  latitude: 14.0667,
  longitude: 120.6333,
  latitudeDelta: 0.08,
  longitudeDelta: 0.05,
};

// ─── Incident Points ───────────────────────────────────
const INCIDENTS = [
  { id: '1', latitude: 14.0720, longitude: 120.6280, severity: 'critical', weight: 1.0, title: 'Flash Flood - Nasugbo', barangay: 'Brgy. Looc' },
  { id: '2', latitude: 14.0580, longitude: 120.6420, severity: 'critical', weight: 1.0, title: 'River Overflow', barangay: 'Brgy. Bucana' },
  { id: '3', latitude: 14.0650, longitude: 120.6350, severity: 'high', weight: 0.75, title: 'Road Hazard', barangay: 'Brgy. Mataas na Kahoy' },
  { id: '4', latitude: 14.0700, longitude: 120.6400, severity: 'high', weight: 0.75, title: 'Flooded Road', barangay: 'Brgy. Kayrilaw' },
  { id: '5', latitude: 14.0630, longitude: 120.6300, severity: 'medium', weight: 0.5, title: 'Standing Water', barangay: 'Brgy. Poblacion' },
  { id: '6', latitude: 14.0600, longitude: 120.6380, severity: 'low', weight: 0.25, title: 'Minor Flooding', barangay: 'Brgy. Wawa' },
];

const HEATMAP_POINTS = INCIDENTS.map(i => ({
  latitude: i.latitude,
  longitude: i.longitude,
  weight: i.weight,
}));

function getMarkerColor(severity: string) {
  switch (severity) {
    case 'critical': return '#e63030';
    case 'high':     return '#f97316';
    case 'medium':   return '#eab308';
    case 'low':      return '#3b82f6';
    default:         return '#9a8a7a';
  }
}

const DRAWER_ITEMS = [
  { id: 'dashboard', icon: 'home-outline', label: 'Dashboard', active: false, badge: null },
  { id: 'AllIncidents', icon: 'list-outline', label: 'All Incidents', active: false, badge: null },
  { id: 'map', icon: 'map-outline', label: 'Map & Heatmap', active: true, badge: null },
  { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', active: false, badge: 5 },
  { id: 'units', icon: 'shield-outline', label: 'Active Units', active: false, badge: null },
  { id: 'settings', icon: 'settings-outline', label: 'Settings', active: false, badge: null },
];

export default function MapHeatmapScreen() {
  const [mode, setMode] = useState<'heatmap' | 'markers'>('heatmap');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

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

  const handleDrawerNav = (id: string) => {
  closeDrawer();
  setTimeout(() => {
    if (id === 'dashboard') router.push('/dashboard' as any);
    else if (id === 'AllIncidents') router.push('/AllIncidents' as any);
    else if (id === 'map') router.push('/MapHeatmap' as any);
  }, 300);
};

  const criticalCount = INCIDENTS.filter(i => i.severity === 'critical').length;
  const highCount = INCIDENTS.filter(i => i.severity === 'high').length;
  const mediumCount = INCIDENTS.filter(i => i.severity === 'medium').length;

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

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={NASUGBU_REGION}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {/* Heatmap Mode */}
          {mode === 'heatmap' && (
            <Heatmap
              points={HEATMAP_POINTS}
              opacity={0.75}
              radius={50}
              gradient={{
                colors: ['#3b82f6', '#eab308', '#f97316', '#e63030'],
                startPoints: [0.1, 0.4, 0.7, 1.0],
                colorMapSize: 256,
              }}
            />
          )}

          {/* Markers Mode */}
          {mode === 'markers' &&
            INCIDENTS.map(incident => (
              <Marker
                key={incident.id}
                coordinate={{ latitude: incident.latitude, longitude: incident.longitude }}
                title={incident.title}
                description={incident.barangay}
                pinColor={getMarkerColor(incident.severity)}
              />
            ))}
        </MapView>

        {/* Legend Card */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Severity Levels</Text>
          {[
            { label: 'Critical', color: '#e63030' },
            { label: 'High', color: '#f97316' },
            { label: 'Medium', color: '#eab308' },
            { label: 'Low', color: '#3b82f6' },
          ].map(item => (
            <View key={item.label} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Toggle Button */}
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setMode(mode === 'heatmap' ? 'markers' : 'heatmap')}
          activeOpacity={0.85}
        >
          <Ionicons
            name={mode === 'heatmap' ? 'map-outline' : 'flame-outline'}
            size={14}
            color="#4a3b2e"
          />
          <Text style={styles.toggleBtnText}>
            {mode === 'heatmap' ? 'Markers' : 'Heatmap'}
          </Text>
        </TouchableOpacity>

        {/* Bottom Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Ionicons name="location-outline" size={20} color="#9a8a7a" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Nasugbu, Batangas Area</Text>
              <Text style={styles.infoSub}>Showing {INCIDENTS.length} active incidents</Text>
            </View>
          </View>
          <View style={styles.infoBadgeRow}>
            <View style={[styles.infoBadge, { backgroundColor: '#e63030' }]}>
              <Text style={styles.infoBadgeText}>{criticalCount} Critical</Text>
            </View>
            <View style={[styles.infoBadge, { backgroundColor: '#f97316' }]}>
              <Text style={styles.infoBadgeText}>{highCount} High</Text>
            </View>
            <View style={[styles.infoBadge, { backgroundColor: '#eab308' }]}>
              <Text style={styles.infoBadgeText}>{mediumCount} Medium</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Dark Overlay */}
      {drawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Side Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
        <SafeAreaView style={styles.drawerInner}>
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

          <View style={styles.drawerMenu}>
            {DRAWER_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.drawerItem, item.active && styles.drawerItemActive]}
                activeOpacity={0.7}
                onPress={() => handleDrawerNav(item.id)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.active ? '#4a3b2e' : '#7a6a58'}
                />
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
  // ─── Layout ───────────────────────────────────────────
  safe: {
    flex: 1,
    backgroundColor: '#C9B99A',
  },

  // ─── Header ───────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    paddingTop: 35,
    backgroundColor: '#C9B99A',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogoWrap: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1a6b3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoCenter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1a3a6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#eab308',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a3b2e',
    lineHeight: 18,
  },
  headerSub: {
    fontSize: 11,
    color: '#7a6a58',
    lineHeight: 14,
  },
  notifWrap: {
    position: 'relative',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e63030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ffffff',
  },

  // ─── Map ──────────────────────────────────────────────
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },

  // ─── Legend ───────────────────────────────────────────
  legendCard: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2a1f14',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    color: '#5a4a38',
  },

  // ─── Toggle Button ────────────────────────────────────
  toggleBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a3b2e',
  },

  // ─── Info Card ────────────────────────────────────────
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0ece5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a1f14',
  },
  infoSub: {
    fontSize: 12,
    color: '#9a8a7a',
    marginTop: 2,
  },
  infoBadgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  infoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  infoBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },

  // ─── Overlay ──────────────────────────────────────────
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 10,
  },

  // ─── Drawer ───────────────────────────────────────────
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#EDE0CE',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerInner: {
    flex: 1,
    paddingTop: 16,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d8ccb8',
    marginBottom: 8,
  },
  drawerUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ddd0bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerUserInfo: {
    flex: 1,
  },
  drawerUserName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2a1f14',
  },
  drawerUserSub: {
    fontSize: 12,
    color: '#7a6a58',
    marginTop: 1,
  },
  drawerMenu: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 2,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  drawerItemActive: {
    backgroundColor: '#d8ccb8',
  },
  drawerItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7a6a58',
    flex: 1,
  },
  drawerItemLabelActive: {
    color: '#2a1f14',
    fontWeight: '600',
  },
  drawerBadge: {
    backgroundColor: '#e63030',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  drawerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#d8ccb8',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e63030',
  },
});
