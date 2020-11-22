import React, { useState } from 'react';
import featureFlipConfig from './config/featureFlip';

const FeatureFlipContext = React.createContext(null);

export const useFeatureFlip = () => {
    const [featureFlip, setFeatureFlip] = useState(featureFlipConfig);
    const setter = (prop, value) => setFeatureFlip({ ...featureFlip, [prop]: value });

    return [featureFlip, setter];
};

export default FeatureFlipContext;
