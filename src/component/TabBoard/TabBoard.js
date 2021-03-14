import React, { useState } from 'react';
import Tab from '../Tab';

const TabBoard = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleTabItemClick = (label) => {
        setActiveTab(label);
    };

    return (
        <div>
            <ol style={{ paddingLeft: 0 }}>
                {children.map((child, index) => {
                    const { label } = child.props;
                    return (
                        <Tab
                            key={index}
                            active={activeTab === label}
                            label={label}
                            onClick={handleTabItemClick}
                        />
                    );
                })}
            </ol>
            <div>
                {children.map((child) => {
                    if (child.props.label !== activeTab) return null;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

export default TabBoard;
