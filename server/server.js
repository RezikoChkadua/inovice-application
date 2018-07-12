import express from 'express'
import path from "path";
import graphqlHTTP from "express-graphql";
import schema from "./schema/schema";
import mongoose from 'mongoose'
import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'

const app = express();

mongoose.connect('mongodb://reziko:reziko1@ds229701.mlab.com:29701/vobi', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to database');
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(express.static(path.join(__dirname, 'client')));

app.use(webpackMiddleware(webpack(webpackConfig)));
export default app