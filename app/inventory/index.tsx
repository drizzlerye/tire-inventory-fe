import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useInventory } from '@/hooks/useInventory';
import type { InventoryItem } from '@/services/tireService';
import { formatTireSize } from '@/utils/formatTireSize';

export default function InventoryScreen() {
  const { items, isLoading, isRefreshing, error, refresh, retry } =
    useInventory();

  const totalUnits = items.reduce((total, item) => total + item.on_hand, 0);
  const lowStockCount = items.filter((item) => item.needs_reorder).length;

  const renderItem = ({ item }: { item: InventoryItem }) => {
    const isLowStock = item.needs_reorder;

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemHeading}>
          <View style={styles.itemNameContainer}>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.model}>{item.model}</Text>
          </View>
          <View style={[styles.stockBadge, isLowStock && styles.lowStockBadge]}>
            <Text
              style={[
                styles.stockBadgeText,
                isLowStock && styles.lowStockBadgeText,
              ]}
            >
              {item.on_hand === 0 ? 'Out of stock' : `${item.on_hand} in stock`}
            </Text>
          </View>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.detail}>
            <Ionicons color="#64748b" name="resize-outline" size={17} />
            <Text style={styles.detailText}>
              {formatTireSize(item.tire_size)}
            </Text>
          </View>
          <View style={styles.detail}>
            <Ionicons color="#64748b" name="speedometer-outline" size={17} />
            <Text style={styles.detailText}>
              Load {item.load_index} / Speed {item.speed_rating}
            </Text>
          </View>
        </View>

        <Text style={styles.reorderLevel}>
          Reorder level: {item.reorder_level}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ title: 'Inventory' }} />
        <ActivityIndicator color="#2563eb" size="large" />
        <Text style={styles.stateText}>Loading inventory...</Text>
      </SafeAreaView>
    );
  }

  if (error && items.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Stack.Screen options={{ title: 'Inventory' }} />
        <Ionicons color="#dc2626" name="alert-circle-outline" size={42} />
        <Text style={styles.errorTitle}>Unable to load inventory</Text>
        <Text style={styles.stateText}>{error}</Text>
        <Pressable onPress={retry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Inventory' }} />
      <FlatList
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={(item) =>
          [
            item.brand,
            item.model,
            item.tire_size,
            item.load_index,
            item.speed_rating,
          ].join('-')
        }
        refreshControl={
          <RefreshControl
            colors={['#2563eb']}
            onRefresh={refresh}
            refreshing={isRefreshing}
            tintColor="#2563eb"
          />
        }
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Current stock</Text>
            <Text style={styles.subtitle}>
              A quick look at the tires available in your shop.
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryValue}>{totalUnits}</Text>
                <Text style={styles.summaryLabel}>Total units</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryValue}>{items.length}</Text>
                <Text style={styles.summaryLabel}>Tire products</Text>
              </View>
              <View style={[styles.summaryCard, styles.alertSummaryCard]}>
                <Text style={[styles.summaryValue, styles.alertSummaryValue]}>
                  {lowStockCount}
                </Text>
                <Text style={styles.summaryLabel}>Low stock</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>All tires</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons color="#94a3b8" name="file-tray-outline" size={44} />
            <Text style={styles.errorTitle}>No tires in inventory</Text>
            <Text style={styles.stateText}>
              Tire records will appear here once they are added.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flexGrow: 1, padding: 20, paddingBottom: 36 },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: { color: '#0f172a', fontSize: 30, fontWeight: '800' },
  subtitle: { marginTop: 7, color: '#64748b', fontSize: 15, lineHeight: 22 },
  summaryRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  summaryCard: {
    flex: 1,
    minHeight: 90,
    padding: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  alertSummaryCard: { backgroundColor: '#fff7ed', borderColor: '#fed7aa' },
  summaryValue: { color: '#0f172a', fontSize: 24, fontWeight: '800' },
  alertSummaryValue: { color: '#c2410c' },
  summaryLabel: { marginTop: 5, color: '#64748b', fontSize: 12 },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    color: '#0f172a',
    fontSize: 19,
    fontWeight: '700',
  },
  separator: { height: 12 },
  itemCard: {
    padding: 17,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 17,
    backgroundColor: '#ffffff',
  },
  itemHeading: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  itemNameContainer: { flex: 1 },
  brand: { color: '#0f172a', fontSize: 17, fontWeight: '700' },
  model: { marginTop: 3, color: '#475569', fontSize: 14 },
  stockBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#dcfce7',
  },
  lowStockBadge: { backgroundColor: '#ffedd5' },
  stockBadgeText: { color: '#166534', fontSize: 11, fontWeight: '700' },
  lowStockBadgeText: { color: '#c2410c' },
  itemDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 16,
  },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  detailText: { color: '#64748b', fontSize: 13 },
  reorderLevel: {
    marginTop: 14,
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  stateText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  errorTitle: {
    marginTop: 12,
    color: '#0f172a',
    fontSize: 19,
    fontWeight: '700',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  retryButtonText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
});
