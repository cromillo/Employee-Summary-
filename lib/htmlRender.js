const fs = require("fs")
const path = require("path")
const templateDir = path.resolve(_dirname,"../templates")

const render = employees => {
    const html = []

    html.push(employees.filter(employee => employee.getRole()==="Manager").map(manager => renderManager (manager)))
    html.push(employees.filter(employee => employee.getRole()==="Engineer").map(engineer => renderEngineer (engineer)))
    html.push(employees.filter(employee => employee.getRole()==="Intern").map(intern => renderIntern (intern)))
    return renderMain(html.join(""))
}



const renderManager = manager => {
    let template = fs.readfileSync(path.resolve(templateDir,"manager.html"),"utf8")
    template = replacePlaceholders (template,"name",manager.getName())
    template = replacePlaceholders (template,"role",manager.getRole())
    template = replacePlaceholders (template,"email",manager.getEmail())
    template = replacePlaceholders (template,"officeNumber",manager.getOfficeNumber())
    template = replacePlaceholders (template,"id",manager.getId())
    return template
}

const renderIntern = intern => {
    let template = fs.readfileSync(path.resolve(templateDir,"intern.html"),"utf8")
    template = replacePlaceholders (template,"name",intern.getName())
    template = replacePlaceholders (template,"role",intern.getRole())
    template = replacePlaceholders (template,"email",intern.getEmail())
    template = replacePlaceholders (template,"school",intern.getSchool())
    template = replacePlaceholders (template,"id",intern.getId())
    return template
}

const renderEngineer = engineer => {
    let template = fs.readfileSync(path.resolve(templateDir,"engineer.html"),"utf8")
    template = replacePlaceholders (template,"name",engineer.getName())
    template = replacePlaceholders (template,"role",engineer.getRole())
    template = replacePlaceholders (template,"email",engineer.getEmail())
    template = replacePlaceholders (template,"github",engineer.getGithub())
    template = replacePlaceholders (template,"id",engineer.getId())
    return template
}

const renderMain = html => {
    let template = fs.readfileSync(path.resolve(templateDir,"main.html"),"utf8")
    return replacePlaceholders (template,"team",html)
}

const replacePlaceholders = (template, placeholder, value) => {
    const pattern = newreg RegExp("{{ "+ placeholder + " }}","gm" )
    return template.replace(pattern,value)
}
