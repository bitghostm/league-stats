var React = require('react');
var config = require('../config/config');
var ReactTabs = require('react-tabs');
var SummaryPanel = require('./summaryPanel');
var RankedStatPanel = require('./rankedStatPanel');
var MatchesPanel = require('./matchesPanel');

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var s3BaseUrl = config.s3BaseUrl;

var statBoardMain = React.createClass({
    getInitialState: function () {
        return {
            rankedStatByChampion: this.props.summonerData.rankedStatByChampion
        };
    },
    handleSelect: function (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },
    render: function() {
        return (
            <section className='row stat-board-section'>
                <Tabs onSelect={this.handleSelect} selectedIndex={2}>
                    <TabList>
                        <Tab>Summary</Tab>
                        <Tab>Ranked Stat</Tab>
                        <Tab>Recent Matches</Tab>
                    </TabList>
                    <TabPanel>
                        <SummaryPanel />
                    </TabPanel>
                    <TabPanel>
                        <RankedStatPanel rankedStatByChampion={this.state.rankedStatByChampion} />
                    </TabPanel>
                    <TabPanel>
                        <MatchesPanel />
                    </TabPanel>
                </Tabs>
            </section>
        );
    }
});

module.exports = statBoardMain;
