import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import TouchableItem from './TouchableItem';
import XText from 'X/XText'
/**
 * Component that renders the navigation list in the drawer.
 */
const DrawerNavigatorItems = ({
    items,
    activeItemKey,
    activeTintColor,
    activeBackgroundColor,
    inactiveTintColor,
    inactiveBackgroundColor,
    getLabel,
    renderIcon,
    onItemPress,
    itemsContainerStyle,
    itemStyle,
    labelStyle,
    activeLabelStyle,
    inactiveLabelStyle,
    iconContainerStyle,
    drawerPosition,
}) => (
        <View style={[styles.container, itemsContainerStyle]}>
            {items.map((route, index) => {
                const focused = activeItemKey === route.key;
                const color = focused ? activeTintColor : inactiveTintColor;
                const backgroundColor = focused
                    ? activeBackgroundColor
                    : inactiveBackgroundColor;
                const scene = { route, index, focused, tintColor: color };
                const icon = renderIcon(scene);
                const label = getLabel(scene);
                const accessibilityLabel = typeof label === 'string' ? label : undefined;
                const extraLabelStyle = focused ? activeLabelStyle : inactiveLabelStyle;
                return (
                    <TouchableItem
                        key={route.key}
                        accessible
                        accessibilityLabel={accessibilityLabel}
                        onPress={() => {
                            onItemPress({ route, focused });
                        }}
                        delayPressIn={0}
                    >
                        <SafeAreaView
                            style={{ backgroundColor }}
                            forceInset={{
                                [drawerPosition]: 'always',
                                [drawerPosition === 'left' ? 'right' : 'left']: 'never',
                                vertical: 'never',
                            }}
                        >
                            <View style={[styles.item, itemStyle]}>
                                {icon ? (
                                    <View
                                        style={[
                                            styles.icon,
                                            focused ? null : styles.inactiveIcon,
                                            iconContainerStyle,
                                        ]}
                                    >
                                        {icon}
                                    </View>
                                ) : null}
                                {typeof label === 'string' ? (
                                    <XText
                                        style={[styles.label, { color }, labelStyle, extraLabelStyle]}
                                    >
                                        {label}
                                    </XText>
                                ) : (
                                        label
                                    )}
                            </View>
                        </SafeAreaView>
                    </TouchableItem>
                );
            })}
        </View>
    );


function logProps(WrappedComponent) {
    return class extends React.Component<any, any> {
        /*         componentDidMount(nextProps) {
                    // console.log('Current props: ', this.props);
                } */
        render() {
            // Wraps the input component in a container, without mutating it. Good!
            return <WrappedComponent {...this.props} />;
        }
    }
}


/* Material design specs - https://material.io/guidelines/patterns/navigation-drawer.html#navigation-drawer-specs */
DrawerNavigatorItems.defaultProps = {
    activeTintColor: '#c65968', //'#2196f3',
    activeBackgroundColor: 'rgba(0, 0, 0, .04)',
    inactiveTintColor: 'rgba(0, 0, 0, .87)',
    inactiveBackgroundColor: 'transparent',
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    inactiveIcon: {
        /*
         * Icons have 0.54 opacity according to guidelines
         * 100/87 * 54 ~= 62
         */
        opacity: 0.62,
    },
    label: {
        margin: 16,
        fontWeight: 'bold',
    },
});

// export default logProps(DrawerNavigatorItems);
export default DrawerNavigatorItems;
