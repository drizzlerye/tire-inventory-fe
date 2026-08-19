import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const quickActions = [
  {
    label: 'Tire Catalog',
    description: 'Add and manage tire details',
    icon: 'disc-outline' as const,
    message: 'The tire catalog will be the next screen to set up.',
  },
  {
    label: 'Sales',
    description: 'Review recent transactions',
    icon: 'receipt-outline' as const,
    message: 'Sales tracking will be available once that screen is set up.',
  },
];

//pnpm exec expo start --clear
export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View style={styles.logoFrame}>
            <Image
              accessibilityLabel="Tire Inventory logo"
              source={require('../assets/images/react-logo.png')}
              style={styles.logo}
            />
          </View>
          <View>
            <Text style={styles.brandName}>Tire Tracker</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Want to know what&apos;s in stock?</Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/inventory')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <View>
              <Text style={styles.primaryButtonText}>View Inventory</Text>
              <Text style={styles.primaryButtonCaption}>
                Browse and update current stock
              </Text>
            </View>
            <Ionicons color="#ffffff" name="arrow-forward" size={22} />
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <Text style={styles.sectionCaption}>
            Jump back into your daily work
          </Text>
        </View>

        <View style={styles.actionList}>
          {quickActions.map((action) => (
            <Pressable
              accessibilityRole="button"
              key={action.label}
              onPress={() => Alert.alert(action.label, action.message)}
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.buttonPressed,
              ]}
            >
              <View style={styles.actionIcon}>
                <Ionicons color="#1d4ed8" name={action.icon} size={24} />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionDescription}>
                  {action.description}
                </Text>
              </View>
              <Ionicons color="#64748b" name="chevron-forward" size={20} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 34,
  },
  logoFrame: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#e0ecff',
  },
  logo: {
    width: 31,
    height: 27,
    resizeMode: 'contain',
  },
  brandName: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  brandCaption: {
    marginTop: 2,
    color: '#64748b',
    fontSize: 13,
  },
  hero: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#0f172a',
  },
  eyebrow: {
    marginBottom: 14,
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: '#ffffff',
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 14,
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  primaryButton: {
    minHeight: 70,
    marginTop: 26,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: '#2563eb',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonCaption: {
    marginTop: 3,
    color: '#dbeafe',
    fontSize: 12,
  },
  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  sectionHeader: {
    marginTop: 32,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionCaption: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
  },
  actionList: {
    gap: 12,
  },
  actionCard: {
    minHeight: 78,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    backgroundColor: '#ffffff',
  },
  actionIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#eff6ff',
  },
  actionText: {
    flex: 1,
    marginHorizontal: 14,
  },
  actionLabel: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  actionDescription: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 13,
  },
});
