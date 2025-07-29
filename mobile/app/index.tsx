import { Text, View } from 'react-native';

const Homepage = () => {
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center px-4'>
        <Text className='font-poppins-semibold text-2xl text-green-600 mb-4 text-center'>
          SemiBold Poppins
        </Text>
      </View>
    </View>
  );
};

export default Homepage;
