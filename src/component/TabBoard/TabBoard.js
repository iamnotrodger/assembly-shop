import React, { useState } from 'react';
import Tab from '../Tab';

import './TabBoard.scss';

const TabBoard = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleTabItemClick = (label) => {
        setActiveTab(label);
    };

    return (
        <div className='tab-board'>
            <ol className='tab-board__list'>
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
            <div className='tab-board__content'>
                {children.map((child) => {
                    if (child.props.label !== activeTab) return null;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

export default TabBoard;
