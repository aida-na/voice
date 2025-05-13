"use client";

import React, { useState } from 'react';
import { Phone, ChevronRight, Settings, MessageSquare, AlertCircle, Check } from 'lucide-react';

const VoiceCampaigns = () => {
  const [activeTab, setActiveTab] = useState('inbound');
  const [expandedNumbers, setExpandedNumbers] = useState(new Set());

  // Mock data grouped by phone number
  const campaignsByPhone = {
    '+16507882164': {
      campaigns: [
        {
          id: 1,
          name: 'Onboarding',
          type: 'INBOUND',
          status: 'ACTIVE',
          lastUpdated: 'May 5, 2025, 7:07:41 PM',
          callBetween: 'N/A'
        },
        {
          id: 2,
          name: 'Program Enrollment',
          type: 'INBOUND',
          status: 'ACTIVE',
          lastUpdated: 'May 3, 2025, 2:15:22 PM',
          callBetween: '9 AM - 5 PM EST'
        },
        {
          id: 3,
          name: 'Medicare Welcome',
          type: 'INBOUND',
          status: 'INACTIVE',
          lastUpdated: 'May 1, 2025, 11:30:45 AM',
          callBetween: '24/7'
        }
      ]
    },
    '+16507195814': {
      campaigns: [
        {
          id: 4,
          name: 'Enrollment',
          type: 'INBOUND',
          status: 'ACTIVE',
          lastUpdated: 'May 13, 2025, 6:16:02 PM',
          callBetween: 'N/A'
        },
        {
          id: 5,
          name: 'Renewal Reminders',
          type: 'OUTBOUND',
          status: 'ACTIVE',
          lastUpdated: 'May 11, 2025, 3:45:00 PM',
          callBetween: '10 AM - 7 PM EST'
        }
      ]
    },
    '+16505401557': {
      campaigns: [
        {
          id: 6,
          name: 'Medicare Welcome',
          type: 'INBOUND',
          status: 'ACTIVE',
          lastUpdated: 'May 13, 2025, 6:16:02 PM',
          callBetween: 'N/A'
        },
      ]
    }
  };

  const togglePhoneExpansion = (phoneNumber: string) => {
    const newExpanded = new Set(expandedNumbers);
    if (newExpanded.has(phoneNumber)) {
      newExpanded.delete(phoneNumber);
    } else {
      newExpanded.add(phoneNumber);
    }
    setExpandedNumbers(newExpanded);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      PENDING: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status as keyof typeof colors] || colors.INACTIVE}`}>
        {status}
      </span>
    );
  };

  const TypeBadge = ({ type }: { type: string }) => {
    const colors = {
      INBOUND: 'bg-blue-100 text-blue-800',
      OUTBOUND: 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[type as keyof typeof colors] || colors.INBOUND}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice Campaigns History</h2>
      
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setActiveTab('outbound')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'outbound'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Outbound
          </button>
          <button
            onClick={() => setActiveTab('inbound')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inbound'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inbound
          </button>
        </nav>
      </div>

      {/* Phone Numbers and Campaigns */}
      <div className="space-y-4">
        {Object.entries(campaignsByPhone).map(([phoneNumber, data]) => (
          <div key={phoneNumber} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Phone Number Header */}
            <div
              className="px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => togglePhoneExpansion(phoneNumber)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">{phoneNumber}</h2>
                  <span className="text-sm text-gray-500">
                    ({data.campaigns.length} campaign{data.campaigns.length !== 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle phone configuration
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </button>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      expandedNumbers.has(phoneNumber) ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Campaigns List */}
            {expandedNumbers.has(phoneNumber) && (
              <div className="border-t border-gray-200">
                {data.campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                          <TypeBadge type={campaign.type} />
                          <StatusBadge status={campaign.status} />
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>Last Updated: {campaign.lastUpdated}</span>
                          <span>Call Between: {campaign.callBetween}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            // Handle view configuration
                          }}
                          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          View configuration
                        </button>
                        <button
                          onClick={() => {
                            // Handle view conversations
                          }}
                          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View conversations
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State (if needed) */}
      {Object.keys(campaignsByPhone).length === 0 && (
        <div className="text-center py-12">
          <Phone className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new voice campaign.</p>
          <div className="mt-6">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Create Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCampaigns;