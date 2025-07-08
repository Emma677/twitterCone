import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  text: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  isLoading?: boolean;
  imageSize?: number;
};

const LoginButton: React.FC<Props> = ({
  text,
  icon,
  onPress,
  isLoading = false,
  imageSize = 40,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full my-1 px-4 py-2 w-full"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Left: Icon + Text */}
      <View className="flex-row items-center">
        <Image
          source={icon}
          style={{ width: imageSize, height: imageSize, marginRight: 12 }}
          resizeMode="contain"
        />
        <Text className="font-medium text-xl  text-gray-800">{text}</Text>
      </View>

      {/* Right: Activity Indicator */}
      {isLoading && (
        <ActivityIndicator size="small" color="#888" />
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;

