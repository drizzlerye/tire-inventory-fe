import { useTires } from '@/hooks/useTires';
import { TireBrand } from '@/services/tireService';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TireScreen() {
  const { brands, isLoading, isRefreshing, error, refresh, retry } = useTires();

  const renderTireBrand = ({ brand }: { brand: TireBrand }) => {
    return <View></View>;
  };
}
