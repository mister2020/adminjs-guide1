(async () => {

    const AdminJs = require('adminjs')
    const AdminJsExpress = require('@adminjs/express')
    const AdminJsMongoose = require('@adminjs/mongoose')

    const express = require('express')
    const app = express()
    const mongoose = require('mongoose')

    AdminJs.registerAdapter(AdminJsMongoose)

    const User = mongoose.model('User', {
        username: String,
        firstname: String,
        lastname: String
    })

    const adminJsOptions = {
        resources: [User]
    }

    const adminJs = new AdminJs(adminJsOptions)

    const router = AdminJsExpress.buildRouter(adminJs)

    app.use('/admin', router)

    const run = async () => {
        const mongooseDb = await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

        app.listen(3000)
    }

    run()

})()