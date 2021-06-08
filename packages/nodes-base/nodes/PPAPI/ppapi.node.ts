import {
  IExecuteFunctions,
} from 'n8n-core';

import {
  IDataObject,
  ILoadOptionsFunctions,
  INodeExecutionData,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
 
export class ppapi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'PPAPI',
    name: 'ppapi',
    icon: 'file:ppapi.png',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Pen Pineapple Apple Pen',
    defaults: {
      name: 'PPAPI',
      color: '#e6ae25',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Campaign',
            value: 'campaign',
          },
          {
            name: 'AdGroup',
            value: 'adGroup',
          },
          {
            name: 'PinPromotion',
            value: 'pinPromotion',
          },
          {
            name: 'Pin',
            value: 'pin',
          },
          {
            name: 'Audience',
            value: 'audience',
          },
          {
            name: 'CustomerList',
            value: 'customerList',
          },
        ],
        default: 'campaign',
        description: 'Resource to call.',
      },

      // ----------------------------------
      //         campaign
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Archive',
            value: 'archive',
          },
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Read',
            value: 'read',
          },
          {
            name: 'Update',
            value: 'update',
          },
          {
            name: 'Search',
            value: 'search',
          },
          {
            name: 'Metrics',
            value: 'metrics',
          },
        ],
        displayOptions: {
          show: {
            resource: [
              'campaign',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },

      // ----------------------------------
      //         adGroup
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Archive',
            value: 'archive',
          },
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Read',
            value: 'read',
          },
          {
            name: 'Update',
            value: 'update',
          },
          {
            name: 'Search',
            value: 'search',
          },
          {
            name: 'Metrics',
            value: 'metrics',
          },
          {
            name: 'Get',
            value: 'get',
          },
        ],
        displayOptions: {
          show: {
            resource: [
              'adGroup',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },

      // ----------------------------------
      //         pinPromotion
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Archive',
            value: 'archive',
          },
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Read',
            value: 'read',
          },
          {
            name: 'Update',
            value: 'update',
          },
          {
            name: 'Get',
            value: 'get',
          },
        ],
        displayOptions: {
          show: {
            resource: [
              'pinPromotion',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },

      // ----------------------------------
      //         pin
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Archive',
            value: 'archive',
          },
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Read',
            value: 'read',
          },
          {
            name: 'Update',
            value: 'update',
          }
        ],
        displayOptions: {
          show: {
            resource: [
              'pin',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },

      // ----------------------------------
      //         audience
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Read',
            value: 'read',
          },
          {
            name: 'Search',
            value: 'search',
          },
          {
            name: 'Update',
            value: 'update',
          }
        ],
        displayOptions: {
          show: {
            resource: [
              'audience',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },

      // ----------------------------------
      //         customerList
      // ----------------------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Create',
            value: 'create',
          },
          {
            name: 'Add',
            value: 'add',
          },
          {
            name: 'Remove',
            value: 'remove',
          }
        ],
        displayOptions: {
          show: {
            resource: [
              'customerList',
            ],
          },
        },
        default: 'create',
        description: 'Operation to execute.',
      },
      // ----------------------------------
      //         Id
      // ----------------------------------
      {
        displayName: 'Id',
        name: 'id',
        type: 'number',
        displayOptions: {
          show: {
            operation: [
              'archive',
              'get',
              'update',
              'read',
              'add',
              'remove',
            ],
          },
        },
        default: '0',
        description: 'ID to execute the call on.',
      },
      // ----------------------------------
      //         Body
      // ----------------------------------
      {
        displayName: 'Body',
        name: 'body',
        type: 'json',
        displayOptions: {
          show: {
            operation: [
              'create',
              'metrics',
              'update',
              'add',
              'remove',
            ],
          },
        },
        default: '{}',
        description: 'Body to send.',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

    let body, id = null;

    try{
      id = this.getNodeParameter('id', 0) as number;
    } catch(e){
      //well...
    }

    try{
      body = JSON.parse(this.getNodeParameter('body', 0) as string);
    } catch(e){
      //well...
    }

    const returnItems: INodeExecutionData[] = [];

    const requestOptions = {
      baseUrl: 'http://ppapi.xidraslbs.com/v1/ac/nlg/ns/pamura/',
      method: 'GET',
      url: ''
    };

    switch (operation) {
      case 'read':
        Object.assign(requestOptions, {
          url: resource + 's/' + id
        });
        break;

      case 'get':
        switch(resource){
          case 'adGroup':
          Object.assign(requestOptions, {
            url: 'campaigns/' + id + '/adGroups'
          });
          break;
          case 'pinPromotion':
            Object.assign(requestOptions, {
              url: 'adGroups/' + id + '/pinPromotions'
            });
          break;
        }
      break;
    
      case 'update':
        Object.assign(requestOptions, {
          url: resource + 's/' + id,
          method: 'PATCH',
          json: body
        });
        break;

      case 'archive':
        Object.assign(requestOptions, {
          url: resource + 's/' + id + '/archive',
          method: 'POST'
        });
        break;

      case 'search':
        Object.assign(requestOptions, {
          url: resource + 's/',
        });
        break;

      case 'create':
        Object.assign(requestOptions, {
          url: resource + 's/',
          method: 'PUT',
          json: body
        });
        break;      

      case 'metrics':
        Object.assign(requestOptions, {
          url: resource + 's/metrics',
          method: 'POST',
          json: body
        });
        break;  
  
      case 'add':
        Object.assign(requestOptions, {
          url: resource + 's/' + id + '/records',
          method: 'PUT',
          json: body
        });
        break;   
        
      case 'remove':
        Object.assign(requestOptions, {
          url: resource + 's/' + id + '/records',
          method: 'DELETE',
          json: body
        });
        break;          
    }

    const response = await this.helpers.request(requestOptions);
    returnItems.push({json: JSON.parse(response)});

    return this.prepareOutputData(returnItems);
}
}

