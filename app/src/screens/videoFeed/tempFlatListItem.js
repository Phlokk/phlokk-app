import { View, Text,  } from 'react-native'
import React, {forwardRef} from 'react'
import { useState } from 'react'

const tempFlatListItem = (props, ref) => {
    const [isInView, setIsInView] = useState(false)

    useImperativeHandle(ref, () => ({
        setVisible: inView => {
            isInView !== inView && setIsInView(inView);
        },
    }));
  return (
    <View>
     {isInView && <Text>tempFlatListItem</Text> }
    </View>
  )
}

export default forwardRef(tempFlatListItem)