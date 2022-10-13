/*
 * Copyright © 2022 Cask Data, Inc.
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

import React from "react";
import { render, screen } from "@testing-library/react";
import WrangleCard from "../index";
import * as reducers from "components/Connections/Create/reducer";
import * as apiHelpers from "components/Connections/Browser/SidePanel/apiHelpers";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory as createHistory } from "history";

const history = createHistory({
  basename: "/",
});

describe("Testing the Wrangle Card Component", () => {
  test("Should check whether WrangleCard Component is rendered or not", () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <WrangleCard />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });

  test("It renders Wrangler-Card ", async () => {
    jest.mock("components/Connections/Create/reducer", () => {
      return Promise.resolve([
        {
          artifact: { name: "words", scope: "", version: "ten" },
          category: "hello",
          classname: "yolo",
          description: "hello",
          name: "HeMan",
          type: "js",
        },
        {
          artifact: { name: "words", scope: "", version: "ten" },
          category: "hello",
          classname: "yolo",
          description: "hello",
          name: "BatMan",
          type: "js",
        },
        {
          artifact: { name: "words", scope: "", version: "ten" },
          category: "hello",
          classname: "yolo",
          description: "hello",
          name: "SuperMan",
          type: "js",
        },
      ]);
    });
    jest.spyOn(reducers, "fetchConnectors").mockReturnValue(
      Promise.resolve([
        {
          name: "S3",
          type: "connector",
          category: "Amazon Web Services",
          description: "Connection to access data in Amazon S3.",
          className: "io.cdap.plugin.aws.s3.connector.S3Connector",
          artifact: {
            name: "amazon-s3-plugins",
            version: "1.18.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "CloudSQLMySQL",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in CloudSQL MySQL Server databases using JDBC.",
          className: "io.cdap.plugin.cloudsql.mysql.CloudSQLMySQLConnector",
          artifact: {
            name: "cloudsql-mysql-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "CloudSQLPostgreSQL",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in CloudSQL PostgreSQL Server databases using JDBC.",
          className:
            "io.cdap.plugin.cloudsql.postgres.CloudSQLPostgreSQLConnector",
          artifact: {
            name: "cloudsql-postgresql-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "File",
          type: "connector",
          category: "File",
          description:
            "Connection to browse and sample data from the local file system.",
          className: "io.cdap.plugin.batch.connector.FileConnector",
          artifact: {
            name: "core-plugins",
            version: "2.10.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "Database",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in relational databases using JDBC.",
          className: "io.cdap.plugin.db.connector.DBConnector",
          artifact: {
            name: "database-plugins",
            version: "2.10.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "BigQuery",
          type: "connector",
          category: "Google Cloud Platform",
          description:
            "Connection to access data in BigQuery datasets and tables.",
          className: "io.cdap.plugin.gcp.bigquery.connector.BigQueryConnector",
          artifact: {
            name: "google-cloud",
            version: "0.21.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "GCS",
          type: "connector",
          category: "Google Cloud Platform",
          description: "Connection to access data in Google Cloud Storage.",
          className: "io.cdap.plugin.gcp.gcs.connector.GCSConnector",
          artifact: {
            name: "google-cloud",
            version: "0.21.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "Spanner",
          type: "connector",
          category: "Google Cloud Platform",
          description:
            "Connection to access data in Spanner databases and tables.",
          className: "io.cdap.plugin.gcp.spanner.connector.SpannerConnector",
          artifact: {
            name: "google-cloud",
            version: "0.21.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "Kafka",
          type: "connector",
          category: "Messaging Systems",
          description: "Connection to access data in Kafka topics.",
          className: "io.cdap.plugin.connector.KafkaConnector",
          artifact: {
            name: "kafka-plugins-client",
            version: "3.1.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "SQL Server",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in SQL Server databases using JDBC.",
          className: "io.cdap.plugin.mssql.SqlServerConnector",
          artifact: {
            name: "mssql-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "MySQL",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in Mysql databases using JDBC.",
          className: "io.cdap.plugin.mysql.MysqlConnector",
          artifact: {
            name: "mysql-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "Oracle",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in Oracle databases using JDBC.",
          className: "io.cdap.plugin.oracle.OracleConnector",
          artifact: {
            name: "oracle-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
        {
          name: "PostgreSQL",
          type: "connector",
          category: "Database",
          description:
            "Connection to access data in PostgreSQL databases using JDBC.",
          className: "io.cdap.plugin.postgres.PostgresConnector",
          artifact: {
            name: "postgresql-plugin",
            version: "1.9.0-SNAPSHOT",
            scope: "SYSTEM",
          },
        },
      ])
    );

    const dummyRes = new Map();
    dummyRes.set("PostgreSql", [
      {
        name: "TESTING",
        connectionId: "TESTING",
        connectionType: "PostgreSQL",
        description: "",
        preConfigured: false,
        isDefault: false,
        createdTimeMillis: 1663766799085,
        updatedTimeMillis: 1663766799085,
        plugin: {
          category: "Database",
          name: "PostgreSQL",
          type: "connector",
          properties: {
            host: "jenkins.divami.com",
            port: "5432",
            jdbcPluginName: "postgresql",
            database: "exlaibias",
            user: "postgres",
            password: "divami",
            connectionArguments: "1=1",
          },
          artifact: {
            scope: "SYSTEM",
            name: "postgresql-plugin",
            version: "1.9.0-SNAPSHOT",
          },
        },
      },
    ]);
    dummyRes.set("File", [
      {
        name: "fjhgkhjl",
        connectionId: "fjhgkhjl",
        connectionType: "File",
        description: "",
        preConfigured: false,
        isDefault: false,
        createdTimeMillis: 1663766703232,
        updatedTimeMillis: 1663766703232,
        plugin: {
          category: "File",
          name: "File",
          type: "connector",
          properties: {},
          artifact: {
            scope: "SYSTEM",
            name: "core-plugins",
            version: "2.10.0-SNAPSHOT",
          },
        },
      },
    ]);

    jest
      .spyOn(apiHelpers, "getCategorizedConnections")
      .mockReturnValue(Promise.resolve(dummyRes));

    render(
      <Router history={history}>
        <Switch>
          <Route>
            <WrangleCard />
          </Route>
        </Switch>
      </Router>
    );

    const ele = screen.getByTestId(/wrangle-card-parent/i);

    // await screen.getByTestId('wrangle-card-parent0');
    expect(ele).toBeInTheDocument();
  });
});
