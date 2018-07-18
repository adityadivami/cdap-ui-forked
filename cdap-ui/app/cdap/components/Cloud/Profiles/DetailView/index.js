/*
 * Copyright © 2018 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MyCloudApi} from 'api/cloud';
import LoadingSVGCentered from 'components/LoadingSVGCentered';
import {objectQuery} from 'services/helpers';
import EntityTopPanel from 'components/EntityTopPanel';
import ProfileDetailViewContent from 'components/Cloud/Profiles/DetailView/Content';
import {ADMIN_CONFIG_ACCORDIONS} from 'components/Administration/AdminConfigTabContent';
import {getCurrentNamespace} from 'services/NamespaceStore';
import {getProvisionersMap} from 'components/Cloud/Profiles/Store/Provisioners';
import T from 'i18n-react';

const PREFIX = 'features.Cloud.Profiles.DetailView';
import {MyMetricApi} from 'api/metric';

require('./DetailView.scss');

export default class ProfileDetailView extends Component {
  state = {
    profile: {},
    oneDayMetrics: {
      runs: '--',
      nodehr: '--'
    },
    overallMetrics: {
      runs: '--',
      nodehr: '--'
    },
    provisioners: [],
    loading: true,
    error: null,
    isSystem: objectQuery(this.props.match, 'params', 'namespace') === 'system'
  };

  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount() {
    this.getProfile();
    this.getProvisioners();

    if (this.state.isSystem) {
      document.querySelector('#header-namespace-dropdown').style.display = 'none';
    }
  }

  componentWillUnmount() {
    document.querySelector('#header-namespace-dropdown').style.display = 'inline-block';
  }

  getMetricsQueryBody = (profile, startTime, endTime) => {
    let {namespace} = this.props.match.params;
    return {
      qid: {
        tags: {
          namespace,
          profilescope: profile.scope,
          profile: `${profile.scope}:${profile.name}`
        },
        metrics: [
          'system.program.completed.runs',
          'system.program.node.minutes'
        ],
        timeRange: {
          start: startTime,
          end: endTime,
          resolution: "auto",
          aggregate: true
        }
      }
    };
  };

  fetchAggregateMetrics = (metricName, startTime, endTime) => {
    let oneDayMetricsRequestBody = this.getMetricsQueryBody(this.state.profile, startTime, endTime);
    MyMetricApi
      .query(null, oneDayMetricsRequestBody)
      .subscribe(
        (metrics) => {
          let runs = '--', nodehr = '--';
          metrics.qid.series.forEach(metric => {
            if (metric.metricName === 'system.program.completed.runs' && Array.isArray(metric.data)) {
              runs = metric.data[0].value;
            }
            if (metric.metricName === 'system.program.node.minutes' && Array.isArray(metric.data)) {
              nodehr = metric.data[0].value;
            }
          });
          this.setState({
            [metricName]: {
              runs,
              nodehr
            }
          });
        }
      );
  }

  fetchMetrics = () => {
    this.fetchAggregateMetrics('oneDayMetrics', 'now-24h', 'now');
    this.fetchAggregateMetrics('overallMetrics', 0, 0);
  };

  getProfile = () => {
    let {namespace, profileId} = this.props.match.params;
    MyCloudApi
      .get({
        namespace,
        profile: profileId
      })
      .subscribe(
        (profile) => {
          this.setState({
            profile,
            loading: false
          }, this.fetchMetrics);
        },
        (error) => {
          this.setState({
            error: error.response || error,
            loading: false
          });
        }
      );
  };

  getProvisioners() {
    getProvisionersMap().subscribe((state) => {
      this.setState({
        provisioners: state.list
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingSVGCentered />;
    }

    let closeBtnlinkObj = this.state.isSystem ? {
      pathname: '/administration/configuration',
      state: { accordionToExpand: ADMIN_CONFIG_ACCORDIONS.systemProfiles }
    } : () => history.back();
    let breadCrumbLabel = this.state.isSystem ? 'Administration' : 'Namespace';
    let breadCrumbAnchorLink = this.state.isSystem ? {
      pathname: '/administration/configuration',
      state: { accordionToExpand: ADMIN_CONFIG_ACCORDIONS.systemProfiles }
    } : `/ns/${getCurrentNamespace()}/details`;
    let {namespace} = this.props.match.params;
    if (!namespace) {
      namespace = getCurrentNamespace();
    }
    return (
      <div className="profile-detail-view">
        <EntityTopPanel
          breadCrumbAnchorLink={breadCrumbAnchorLink}
          breadCrumbAnchorLabel={breadCrumbLabel}
          title={T.translate(`${PREFIX}.computeProfileOverview`)}
          closeBtnAnchorLink={closeBtnlinkObj}
        />
        {
          this.state.error ?
            (
              <div className="text-danger text-xs-center">
                {this.state.error}
              </div>
            )
          :
            <ProfileDetailViewContent
              profile={this.state.profile}
              provisioners={this.state.provisioners}
              isSystem={this.state.isSystem}
              toggleProfileStatusCallback={this.getProfile}
              namespace={namespace}
              oneDayMetrics={this.state.oneDayMetrics}
              overallMetrics={this.state.overallMetrics}
            />
        }
      </div>
    );
  }
}
