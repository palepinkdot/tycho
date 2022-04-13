"use strict";const Service=use("App/Models/Service"),{validateAll:validateAll}=use("Validator"),Env=use("Env"),{v4:uuid}=require("uuid"),path=require("path"),fs=require("fs-extra"),{LOCAL_HOSTNAME:LOCAL_HOSTNAME,DEFAULT_SERVICE_ORDER:DEFAULT_SERVICE_ORDER}=require("../../../../config"),{API_VERSION:API_VERSION}=require("../../../../environment-remote"),hostname=LOCAL_HOSTNAME,port=Env.get("PORT");class ServiceController{async create({request:e,response:s}){const t=await validateAll(e.all(),{name:"required|string",recipeId:"required"});if(t.fails())return s.status(401).send({message:"Invalid POST arguments",messages:t.messages(),status:401});const i=e.all();let r;do{r=uuid()}while((await Service.query().where("serviceId",r).fetch()).rows.length>0);return await Service.create({serviceId:r,name:i.name,recipeId:i.recipeId,settings:JSON.stringify(i)}),s.send({data:{userId:1,id:r,isEnabled:!0,isNotificationEnabled:!0,isBadgeEnabled:!0,isMuted:!1,isDarkModeEnabled:"",spellcheckerLanguage:"",order:DEFAULT_SERVICE_ORDER,customRecipe:!1,hasCustomIcon:!1,workspaces:[],iconUrl:null,...i},status:["created"]})}async list({response:e}){const s=(await Service.all()).rows.map((e=>{const s="string"==typeof e.settings?JSON.parse(e.settings):e.settings;return{customRecipe:!1,hasCustomIcon:!1,isBadgeEnabled:!0,isDarkModeEnabled:"",isEnabled:!0,isMuted:!1,isNotificationEnabled:!0,order:DEFAULT_SERVICE_ORDER,spellcheckerLanguage:"",workspaces:[],...JSON.parse(e.settings),iconUrl:s.iconId?`http://${hostname}:${port}/${API_VERSION}/icon/${s.iconId}`:null,id:e.serviceId,name:e.name,recipeId:e.recipeId,userId:1}}));return e.send(s)}async edit({request:e,response:s,params:t}){if(e.file("icon")){await fs.ensureDir(path.join(Env.get("USER_PATH"),"icons"));const i=e.file("icon",{types:["image"],size:"2mb"}),{id:r}=t,n=(await Service.query().where("serviceId",r).fetch()).rows[0],a="string"==typeof n.settings?JSON.parse(n.settings):n.settings;let o;do{o=uuid()+uuid()}while(fs.existsSync(path.join(Env.get("USER_PATH"),"icons",o)));if(o=`${o}.${i.extname}`,await i.move(path.join(Env.get("USER_PATH"),"icons"),{name:o,overwrite:!0}),!i.moved())return s.status(500).send(i.error());const c={...a,iconId:o,customIconVersion:a&&a.customIconVersion?a.customIconVersion+1:1};return await Service.query().where("serviceId",r).update({name:n.name,settings:JSON.stringify(c)}),s.send({data:{id:r,name:n.name,...c,iconUrl:`http://${hostname}:${port}/${API_VERSION}/icon/${c.iconId}`,userId:1},status:["updated"]})}const i=e.all(),{id:r}=t,n=(await Service.query().where("serviceId",r).fetch()).rows[0],a={..."string"==typeof n.settings?JSON.parse(n.settings):n.settings,...i};await Service.query().where("serviceId",r).update({name:i.name,settings:JSON.stringify(a)});const o=(await Service.query().where("serviceId",r).fetch()).rows[0];return s.send({data:{id:r,name:o.name,...a,iconUrl:`${Env.get("APP_URL")}/${API_VERSION}/icon/${a.iconId}`,userId:1},status:["updated"]})}async icon({params:e,response:s}){const{id:t}=e,i=path.join(Env.get("USER_PATH"),"icons",t);return fs.existsSync(i)?s.download(i):s.status(404).send({status:"Icon doesn't exist"})}async reorder({request:e,response:s}){const t=e.all();for(const e of Object.keys(t)){const s=(await Service.query().where("serviceId",e).fetch()).rows[0],i={...JSON.parse(s.settings),order:t[e]};await Service.query().where("serviceId",e).update({settings:JSON.stringify(i)})}const i=(await Service.all()).rows.map((e=>{const s="string"==typeof e.settings?JSON.parse(e.settings):e.settings;return{customRecipe:!1,hasCustomIcon:!1,isBadgeEnabled:!0,isDarkModeEnabled:"",isEnabled:!0,isMuted:!1,isNotificationEnabled:!0,order:DEFAULT_SERVICE_ORDER,spellcheckerLanguage:"",workspaces:[],...JSON.parse(e.settings),iconUrl:s.iconId?`http://${hostname}:${port}/${API_VERSION}/icon/${s.iconId}`:null,id:e.serviceId,name:e.name,recipeId:e.recipeId,userId:1}}));return s.send(i)}async delete({params:e,response:s}){return await Service.query().where("serviceId",e.id).delete(),s.send({message:"Sucessfully deleted service",status:200})}}module.exports=ServiceController;