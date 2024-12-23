import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysqlDatasource',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Murtuza@12309',
  database: 'authentication'
};


@lifeCycleObserver('datasource')
export class MysqlDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
