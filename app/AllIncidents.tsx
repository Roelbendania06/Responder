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

type Severity = 'critical' | 'high' | 'medium' | 'low';
type Status = 'pending' | 'responding' | 'resolved';

interface Incident {
  id: string;
  title: string;
  location: string;
  reportedBy: string;
  time: string;
  status: Status;
  severity: Severity;
}

const ALL_INCIDENTS: Incident[] = [
  { id: '1', title: 'Flash Flood - Nasugbo', location: 'Barangay Looc, Nasugbo, Batangas', reportedBy: 'Maria Santos', time: '5 mins ago', status: 'pending', severity: 'critical' },
  { id: '2', title: 'Road Hazard - Coastal Area', location: 'Barangay Mataas na Kahoy, Nasugbo, Batangas', reportedBy: 'Juan Dela Cruz', time: '12 mins ago', status: 'responding', severity: 'high' },
  { id: '3', title: 'Standing Water - Town Center', location: 'Barangay Poblacion, Nasugbo, Batangas', reportedBy: 'Ana Reyes', time: '25 mins ago', status: 'pending', severity: 'medium' },
  { id: '4', title: 'Flooded Road - Highway', location: 'Barangay Kayrilaw, Nasugbo, Batangas', reportedBy: 'Carlos Mendoza', time: '32 mins ago', status: 'responding', severity: 'high' },
  { id: '5', title: 'Minor Flooding - Beach Road', location: 'Barangay Wawa, Nasugbo, Batangas', reportedBy: 'Lisa Garcia', time: '45 mins ago', status: 'resolved', severity: 'low' },
  { id: '6', title: 'Debris on Road - Mountain Pass', location: 'Barangay Calayo, Nasugbo, Batangas', reportedBy: 'Robert Tan', time: '1 hour ago', status: 'resolved', severity: 'medium' },
  { id: '7', title: 'River Overflow - Brgy. Bucana', location: 'Barangay Bucana, Nasugbo, Batangas', reportedBy: 'Jenny Villanueva', time: '1 hr 20 mins ago', status: 'pending', severity: 'critical' },
  { id: '8', title: 'Landslide Risk - Hill Area', location: 'Barangay Malapad, Nasugbo, Batangas', reportedBy: 'Rico Flores', time: '2 hours ago', status: 'resolved', severity: 'low' },
];

const DRAWER_ITEMS = [
  { id: 'dashboard', icon: 'home-outline', label: 'Dashboard', active: false, badge: null },
  { id: 'AllIncidents', icon: 'list-outline', label: 'All Incidents', active: true, badge: null },
  { id: 'map', icon: 'map-outline', label: 'Map & Heatmap', active: false, badge: null },
  { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', active: false, badge: 5 },
  { id: 'units', icon: 'shield-outline', label: 'Active Units', active: false, badge: null },
  { id: 'settings', icon: 'settings-outline', label: 'Settings', active: false, badge: null },
];

type Tab = 'All' | 'Pending' | 'Active' | 'Resolved';
const TABS: Tab[] = ['All', 'Pending', 'Active', 'Resolved'];

function getSeverityStyle(severity: Severity) {
  switch (severity) {
    case 'critical': return { bg: '#e63030', text: '#ffffff' };
    case 'high':     return { bg: '#f97316', text: '#ffffff' };
    case 'medium':   return { bg: '#eab308', text: '#ffffff' };
    case 'low':      return { bg: '#3b82f6', text: '#ffffff' };
  }
}

function getStatusStyle(status: Status) {
  switch (status) {
    case 'responding': return { borderColor: '#9a8a7a', color: '#5a4a38' };
    case 'resolved':   return { borderColor: '#16a34a', color: '#16a34a' };
    default:           return { borderColor: '#c0b0a0', color: '#7a6a58' };
  }
}

function filterIncidents(incidents: Incident[], tab: Tab): Incident[] {
  switch (tab) {
    case 'Pending':  return incidents.filter(i => i.status === 'pending');
    case 'Active':   return incidents.filter(i => i.status === 'responding');
    case 'Resolved': return incidents.filter(i => i.status === 'resolved');
    default:         return incidents;
  }
}

export default function AllIncidentsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const filtered = filterIncidents(ALL_INCIDENTS, activeTab);

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

      {/* Page Title */}
      <View style={styles.pageTitleRow}>
        <Text style={styles.pageTitle}>All Incidents</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="filter-outline" size={22} color="#7a6a58" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Incident List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#c0b0a0" />
            <Text style={styles.emptyText}>No incidents found</Text>
          </View>
        ) : (
          filtered.map((incident) => {
            const severityStyle = getSeverityStyle(incident.severity);
            const statusStyle = getStatusStyle(incident.status);
            return (
              <View key={incident.id} style={styles.incidentCard}>
                <View style={styles.incidentTitleRow}>
                  <Text style={styles.incidentTitle} numberOfLines={1}>
                    {incident.title}
                  </Text>
                  <View style={[styles.severityBadge, { backgroundColor: severityStyle.bg }]}>
                    <Text style={[styles.severityText, { color: severityStyle.text }]}>
                      {incident.severity}
                    </Text>
                  </View>
                </View>

                <View style={styles.incidentLocRow}>
                  <Ionicons name="location-outline" size={12} color="#9a8a7a" />
                  <Text style={styles.incidentLoc}>{incident.location}</Text>
                </View>

                <Text style={styles.reportedBy}>Reported by: {incident.reportedBy}</Text>

                <View style={styles.incidentFooter}>
                  <View style={styles.incidentTimeRow}>
                    <Ionicons name="time-outline" size={12} color="#9a8a7a" />
                    <Text style={styles.incidentTime}>{incident.time}</Text>
                  </View>
                  <View style={[styles.statusBadge, { borderColor: statusStyle.borderColor }]}>
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>
                      {incident.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
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

  // ─── Page Title ───────────────────────────────────────
  pageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2a1f14',
  },

  // ─── Tabs ─────────────────────────────────────────────
  tabsWrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#ddd0bc',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#9a8a7a',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7a6a58',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // ─── Scroll ───────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },

  // ─── Empty State ──────────────────────────────────────
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#9a8a7a',
  },

  // ─── Incident Card ────────────────────────────────────
  incidentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  incidentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  incidentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2a1f14',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  incidentLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  incidentLoc: {
    fontSize: 12,
    color: '#9a8a7a',
    flex: 1,
  },
  reportedBy: {
    fontSize: 12,
    color: '#9a8a7a',
    marginBottom: 12,
  },
  incidentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  incidentTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  incidentTime: {
    fontSize: 12,
    color: '#9a8a7a',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
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
