(()=>{var e={186:(e,t,r)=>{"use strict";function s(){}r.d(t,{Z:()=>s}),e=r.hmd(e),function(t,s,n){var i,a=256,o="random",c=n.pow(a,6),u=n.pow(2,52),l=2*u,p=a-1;function h(e,p,h){var b=[],w=g(m((p=1==p?{entropy:!0}:p||{}).entropy?[e,f(s)]:null==e?function(){try{i=r(82);var e=crypto.randomByte;return i&&(e=i.randomBytes)?e=e(a):(e=new Uint8Array(a),(t.crypto||t.msCrypto).getRandomValues(e)),f(e)}catch(e){var n=t.navigator,o=n&&n.plugins;return[+new Date,t,o,t.screen,f(s)]}}():e,3),b),k=new _(b),v=function(){for(var e=k.g(6),t=c,r=0;e<u;)e=(e+r)*a,t*=a,r=k.g(1);for(;e>=l;)e/=2,t/=2,r>>>=1;return(e+r)/t};return v.int32=function(){return 0|k.g(4)},v.quick=function(){return k.g(4)/4294967296},v.double=v,g(f(k.S),s),(p.pass||h||function(e,t,r,s){return s&&(s.S&&d(s,k),e.state=function(){return d(k,{})}),r?(n[o]=e,t):e})(v,w,"global"in p?p.global:this==n,p.state)}function _(e){var t,r=e.length,s=this,n=0,i=s.i=s.j=0,o=s.S=[];for(r||(e=[r++]);n<a;)o[n]=n++;for(n=0;n<a;n++)o[n]=o[i=p&i+e[n%r]+(t=o[n])],o[i]=t;(s.g=function(e){for(var t,r=0,n=s.i,i=s.j,o=s.S;e--;)t=o[n=p&n+1],r=r*a+o[p&(o[n]=o[i=p&i+t])+(o[i]=t)];return s.i=n,s.j=i,r})(a)}function d(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function m(e,t){var r,s=[],n=typeof e;if(t&&"object"==n)for(r in e)try{s.push(m(e[r],t-1))}catch(e){}return s.length?s:"string"==n?e:e+"\0"}function g(e,t){for(var r,s=e+"",n=0;n<s.length;)t[p&n]=p&(r^=19*t[p&n])+s.charCodeAt(n++);return f(t)}function f(e){return String.fromCharCode.apply(0,e)}if(g(n.random(),s),e.exports){e.exports=h;try{i=r(82)}catch(e){}}else"function"==typeof define&&r.amdO?define((function(){return h})):n["seed"+o]=h}("undefined"!=typeof self?self:void 0,[],Math)},82:()=>{}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={id:s,loaded:!1,exports:{}};return e[s](i,i.exports,r),i.loaded=!0,i.exports}r.amdO={},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=r(186);function s(e){return new u(e)}!function(e){e[e.STRING=1]="STRING",e[e.NUMBER=2]="NUMBER"}(e||(e={}));class n{string_page(e){return()=>this.print_string_on_stage(e)}stage_string_pages(e){let t=[];for(let r of e)t.push(this.string_page(r));return t}get_given_answer(e){return e}print_on_input_response(e){}set_focus_on_input(){}}class i{constructor(e){this.input_type=e}accepted_responses(){return this.input_type.accepted_responses()}given_answer(e){return this.input_type.given_answer(e)}start_measurement(e){this.start_time=(new Date).getTime().valueOf(),e.print_task()}stop_measurement(e,t){let r=(new Date).getTime().valueOf();t.given_answer=this.input_type.get_given_answer(e),t.required_milliseconds=r-this.start_time,t.do_print_after_task_information()}incorrect_response(e,t){t.do_print_error_message(this.input_type.get_given_answer(e))}output_writer(){return this.input_type.output_writer}get_given_answer(e){return this.input_type.get_given_answer(e)}}class a extends i{constructor(e){super(e)}}class o extends i{constructor(e){super(e)}}class c{constructor(e){this.output_writer=e}print_input_request(){this.output_writer.ask_for_input()}get_given_answer(e){return this.output_writer.get_given_answer(e)}}class u extends c{constructor(e){super(e)}accepted_responses(){return["Enter"]}given_answer(e){}}const l=new class{constructor(){Math.seedrandom("1234567890")}new_random_integer(e){return Math.trunc(e*Math.random())}set_seed(e){Math.seedrandom(e)}};function p(e){l.set_seed(e)}function h(e){return l.new_random_integer(e)}function _(e,t){return-1!=e.indexOf(t)}(0,t.Z)();class d{constructor(e,t,r){this.expected_answer="",this.given_answer="",this.required_milliseconds=null,this.task_number_in_execution=-1,this.do_print_task=()=>{throw new Error("Method not implemented.")},this.do_print_error_message=()=>{throw new Error("Method not implemented.")},this.accepts_answer_function=e=>!0,this.do_print_after_task_information=()=>{throw new Error("Method not implemented.")},this.treatment_combination=e,this.experiment_definition=t}accepts_answer(e){let t=this.experiment_definition.measurement.get_given_answer(e);return this.accepts_answer_function(t)}html_string_with_cmd(e,t){}html_node_with_cmd(e,t){}after_task_string_constructor(e){}after_task_html_string_constructor(e){}print_between_tasks(){}print_task(){this.do_print_task(),this.print_input_request()}print_input_request(){this.experiment_definition.measurement.input_type.print_input_request()}}class m{constructor(e,t,r,s,n,i){this.questionnaire_responses=[],this.tasks=[],this.repetitions=1,this.template={experiment_name:e,variables:r,repetitions:s,task_creator:i},this.experiment_name=e,this.variables=r,this.repetitions=s,this.measurement=n,this.task_creator=i,this.init_experiment(t)}init_experiment(e){p(e),this.createTasks(),this.do_random_task_ordering()}createTasks(){this.tasks=[],this.all_treatment_combinations_do((e=>{let t=this.create_Task(e);this.task_creator(t),this.tasks.push(t)}))}all_treatment_combinations_do(e){for(let t=1;t<=this.repetitions;t++)this.variables[0].all_treatment_combinations_do([],this.variables.slice(1),e)}do_random_task_ordering(){let e=[],t=this.tasks.slice(),r=1;for(;e.length<this.tasks.length;){let s=h(t.length);e.push(t[s]),t[s].task_number_in_execution=r,t.splice(s,1),r++}this.tasks=e}generate_csv_data(){let e=[];for(let t of this.questionnaire_responses)e.push('"'+t.variable.name+'";');for(let t of this.variables)e.push(t.name+";");e.push("expected_answer;given_answer;is_correct;time_in_milliseconds;\n");for(let t of this.tasks){for(let t of this.questionnaire_responses)e.push('"'+t.value.split('"').join('""')+'";');for(let r of t.treatment_combination)e.push(r.value+";");e.push(t.expected_answer+";"),e.push(t.given_answer+";"),e.push((t.given_answer==t.expected_answer)+";"),e.push(t.required_milliseconds+";"),e.push("\n")}return e}}class g{}class f extends g{constructor(e){super(),this.acceptor_function=e}accepts(e){return this.acceptor_function(e)}}class b{constructor(e,t,r,s){this.from=e,this.acceptor=t,this.next_state=r,this.action=s}is_valid_input(e){return this.acceptor.accepts(e)}accepts(e){return this.acceptor.accepts(e)}}function w(e,t,r,s){return new b(e,new f(t),r,((e,t,r)=>s(t)))}function k(e){return{to:t=>({on:r=>({if:s=>({do:n=>w(e,(e=>e==r&&s(e)),t,n)}),do:s=>w(e,(e=>e==r),t,s)}),on_any:r=>({if:s=>({do:n=>w(e,(e=>_(r,e)&&s(e)),t,n)}),do:s=>w(e,(e=>_(r,e)),t,s)})})}}class v{constructor(e){this.current_state=-1,this.transitions=[],this.states=[],this.start_state=e.start,this.states=e.states;for(let e=0;e<this.states.length;e++)this.transitions.push([]);for(let t of e.transitions)this.transitions[t.from].push(t);this.init_function=e.init_function,this.end_states=e.end_states}input(e){let t=this.first_match(e),r=this.current_state;null!=t&&(this.current_state=t.next_state,t.action(r,e,this.current_state))}start(){this.current_state=this.start_state}first_match(e){for(let t=0;t<this.transitions[this.current_state].length;t++)if(this.transitions[this.current_state][t].accepts(e))return this.transitions[this.current_state][t];return null}initialize(){this.current_state=this.start_state,this.init_function()}add_finish_action(e){for(let t of this.transitions)for(let r of t)if(this.is_transition_to_end(r)){let t=r.action;r.action=(r,s,n)=>{t(r,s,n),e()}}}is_transition_to_end(e){return _(this.end_states,e.next_state)}add_action_to_transitions(e,t){for(let r of this.transitions)for(let s of r)if(e(s)){let e=s.action;s.action=(r,s,n)=>{e(r,s,n),t()}}}}class y{constructor(e,t,r,s,n){this.states=e,this.start=t,this.init_function=r,this.transitions=s,this.end_states=n}}function x(e,t,r,s,n){return new v(new y(e,t,r,s,n))}class j{constructor(e){this.set_active_function=()=>{},this.forwarder_name=e}input(e){this.automata.input(e)}set_active(){this.show_intro()}add_activation_function(e){}show_intro(){}}class E extends j{constructor(e,t,r){super(e),this.pre_run_instructions=r,this.measurement=t,this.add_activation_function((()=>this.output_writer().print_string_to_state(this.forwarder_name)))}output_writer(){return this.measurement.output_writer()}show_intro(){super.show_intro(),this.pre_run_instructions()}}class q extends E{constructor(e,t,r){super(e,r,null),this.current_page_number=-1,this.pages=t,this.current_page_number=0,this.print_current_page=()=>{this.pages[this.current_page_number]()},this.create_automata()}create_automata(){this.automata=x(this.states(),this.start_state(),(()=>{this.print_current_page()}),this.create_transitions(),this.end_states())}end_states(){return[1]}start_state(){return 0}states(){return[0,1]}create_transitions(){return[k(0).to(0).on("ArrowRight").if((()=>this.current_page_number<this.pages.length-1)).do((()=>{this.go_to_next_page()})),k(0).to(0).on("ArrowLeft").if((()=>this.current_page_number>0)).do((()=>{this.go_to_previous_page()})),k(0).to(1).on("Enter").if((()=>this.current_page_number==this.pages.length-1)).do((()=>{}))]}go_to_previous_page(){this.pages[this.current_page_number](),this.current_page_number--,this.print_current_page()}go_to_next_page(){this.pages[this.current_page_number](),this.current_page_number++,this.print_current_page()}set_active(){super.set_active(),this.print_current_page()}}class T extends E{current_task(){return this.experiment_definition.tasks[this.current_task_index]}constructor(e,t,r,s,n){super(e,n,r),this.current_task_index=-1,this.seed=t,this.experiment_definition=s,p(this.seed),this.create_automata()}set_active(){this.set_experiment_index(0),super.set_active()}create_automata(){this.automata=x([0,1,2,3,4,5],0,(()=>{}),[k(0).to(1).on("Enter").do((e=>{this.measurement.start_measurement(this.current_task())})),k(1).to(2).on_any(this.measurement.accepted_responses()).if((e=>this.current_task().accepts_answer(e)&&this.current_task_index<this.experiment_definition.tasks.length-1)).do((e=>{this.measurement.stop_measurement(e,this.current_task())})),k(1).to(1).on_any(this.measurement.accepted_responses()).if((e=>!this.current_task().accepts_answer(e))).do((e=>{this.measurement.incorrect_response(e,this.current_task())})),k(2).to(1).on("Enter").if((e=>this.current_task_index<this.experiment_definition.tasks.length-1)).do((e=>{this.inc_current_experiment(),this.measurement.start_measurement(this.current_task())})),k(1).to(3).on_any(this.measurement.accepted_responses()).if((e=>this.current_task().accepts_answer(e)&&this.current_task_index==this.experiment_definition.tasks.length-1)).do((e=>{this.measurement.stop_measurement(e,this.current_task())}))],[3]),this.automata.initialize()}set_experiment_index(e){this.current_task_index=e,this.output_writer().print_string_to_page_number(this.current_task_index+1+" / "+this.experiment_definition.tasks.length)}inc_current_experiment(){this.set_experiment_index(++this.current_task_index)}}class S extends j{constructor(e){super("Default Sequential Forwarder Forwader"),this.current_forwarder_index=0,this.forwarders=e;for(let t of e)t.automata.add_finish_action((()=>this.automata.input("switch to next state")));this.automata=x([0,1],0,(()=>{}),[k(0).to(0).on("switch to next state").if((()=>this.current_forwarder_index<this.forwarders.length-1)).do((()=>{this.current_forwarder_index++,this.current_forwarder().set_active()})),k(0).to(1).on("switch to next state").if((()=>this.current_forwarder_index==this.forwarders.length-1)).do((()=>{}))],[1]),this.automata.initialize()}input(e){this.forwarders[this.current_forwarder_index].input(e)}input_sequence(e){for(let t of e)this.input(t)}current_forwarder(){return this.forwarders[this.current_forwarder_index]}set_active(){super.set_active(),this.current_forwarder().set_active()}}class A{constructor(e,t){this.variable=e,this.value=t}}class R{constructor(e,t){this.treatments=[],this.name=e;for(let e of t)this.treatments.push(new A(this,e))}all_treatment_combinations_do(e,t,r){for(var s of this.treatments){let n=e.slice();n.push(s),0==t.length?r(n):t[0].all_treatment_combinations_do(n,t.slice(1),r)}}}class z extends m{create_code_all_experiment_automatas(e){e.measurement.output_writer(),new q("introduction",e.introduction_texts,e.measurement).add_activation_function((()=>{})),new q("finish",e.finish_texts,e.measurement).add_activation_function((()=>{}));let t,r=new T("Experiment",e.seed,e.pre_run_instructions,this,e.measurement);return r.automata.add_finish_action((()=>e.finish_function(r.experiment_definition))),t=new S([r]),t}clone(){return new z(this.template.experiment_name,""+h(123456789),this.template.variables,this.template.repetitions,this.measurement,this.template.task_creator)}create_Task(e){return new d(e,this,"")}}class M extends n{print_experiment_name(){}clear_stage(){let e=["STAGE","STAGE_MSG","STAGE_ERROR"];for(let t of e){let e=document.getElementById(t);for(;e.firstChild;)e.removeChild(e.firstChild)}}print_error_string_on_stage(e){this.get_html_element_by_id("STAGE_ERROR").innerHTML=e}get_html_element_by_id(e){return document.getElementById(e)}print_string_to_state(e){this.get_html_element_by_id("STATE").innerHTML=e}print_string_on_stage(e){this.get_html_element_by_id("STAGE").innerHTML=e}ask_for_input(){console.log("request input");let e=document.createElement("p"),t=document.createElement("input");t.setAttribute("type","text"),e.appendChild(t),t.id="INPUT",this.get_html_element_by_id("STAGE").appendChild(e),t.focus()}set_focus_on_input(){this.get_html_element_by_id("INPUT").focus()}print_string_to_page_number(e){this.get_html_element_by_id("TASK").innerHTML=e}get_given_answer(){return this.get_html_element_by_id("INPUT").value}print_on_input_response(e){this.get_html_element_by_id("INPUT").value=e}create_html_element_from_string(e){return(new DOMParser).parseFromString(e,"text/html").body}print_html_on_stage(e){this.get_html_element_by_id("STAGE").appendChild(this.create_html_element_from_string(e))}print_html_on_error(e){this.get_html_element_by_id("STAGE_ERROR").appendChild(this.create_html_element_from_string(e))}}var C;(C=Nof1).SET_SEED=p,C.text_input=s,C.new_random_integer=h,C.BROWSER_EXPERIMENT=function(e){let t=new M,r=e(t),s=r.measurement(t),n=function(e){let t=[];for(let r of e.layout)t.push(new R(r.variable,r.treatments));return new z(e.experiment_name,e.seed,t,e.repetitions,e.measurement,e.task_configuration).create_code_all_experiment_automatas({seed:e.seed,introduction_texts:e.introduction_pages,pre_run_instructions:e.pre_run_instructions,finish_texts:e.finish_pages,measurement:e.measurement,finish_function:e.finish_function})}({experiment_name:r.experiment_name,seed:r.seed,introduction_pages:r.introduction_pages,pre_run_instructions:r.pre_run_instructions,finish_pages:r.finish_pages,layout:r.layout,repetitions:r.repetitions,task_configuration:r.task_configuration,measurement:s,finish_function:e=>{document.removeEventListener("keydown",i),function(e,t){const r=new Blob(t,{type:"application/ssc"}),s=window.document.createElement("a");s.href=window.URL.createObjectURL(r),s.download="experimentdata",document.body.appendChild(s),s.click(),document.body.removeChild(s)}(0,e.generate_csv_data())}}),i=e=>{let t=(s="","Alt"!=(r=e).key&&r.ctrlKey?"Alt+Ctrl":"Control"!=r.key&&r.altKey?"Ctrl+Alt":(s+=r.altKey?"+Alt":"",s+=r.ctrlKey?"+Control":"","Alt"==r.key?"Alt":""+r.key+s));var r,s;n.input(t)};document.addEventListener("keydown",i,!1),n.set_active()},C.text_input=s,C.new_random_integer=h,C.Time_to_finish=function(e){return t=>new o(e(t))},C.Reaction_time=function(e){return new a(e)},C.Nouns=class{constructor(){this.words=["account","achiever","acoustics","act","action","activity","actor","addition","adjustment","advertisement","advice","aftermath","afternoon","afterthought","agreement","air","airplane","airport","alarm","amount","amusement","anger","angle","animal","ants","apparatus","apparel","appliance","approval","arch","argument","arithmetic","arm","army","art","attack","attraction","aunt","authority","back","badge","bag","bait","balance","ball","base","baseball","basin","basket","basketball","bat","bath","battle","bead","bear","bed","bedroom","beds","bee","beef","beginner","behavior","belief","believe","bell","bells","berry","bike","bikes","bird","birds","birth","birthday","bit","bite","blade","blood","blow","board","boat","bomb","bone","book","books","boot","border","bottle","boundary","box","brake","branch","brass","breath","brick","bridge","brother","bubble","bucket","building","bulb","burst","bushes","business","butter","button","branch","brass","breath","brick","bridge","brother","bubble","bucket","building","bulb","burst","bushes","business","butter","button","cabbage","cable","cactus","cake","cakes","calculator","calendar","camera","camp","can","cannon","canvas","cap","caption","car","card","care","carpenter","carriage","cars","cart","cast","cat","cats","cattle","cause","cave","celery","cellar","cemetery","cent","chalk","chance","change","channel","cheese","cherries","cherry","chess","chicken","chickens","chin","church","circle","clam","cloth","clover","club","coach","coal","coast","coat","cobweb","coil","collar","color","committee","company","comparison","competition","condition","connection","control","cook","copper","corn","cough","country","cover","cow","cows","crack","cracker","crate","crayon","cream","creator","creature","credit","crib","crime","crook","crow","crowd","crown","cub","cup","current","curtain","curve","cushion","dad","daughter","day","death","debt","decision","deer","degree","design","desire","desk","destruction","detail","development","digestion","dime","dinner","dinosaurs","direction","dirt","discovery","discussion","distance","distribution","division","dock","doctor","dog","dogs","doll","dolls","donkey","door","downtown","drain","drawer","dress","drink","driving","drop","duck","ducks","dust","ear","earth","earthquake","edge","education","effect","egg","eggnog","eggs","elbow","end","engine","error","event","example","exchange","existence","expansion","experience","expert","eye","eyes","face","fact","fairies","fall","fang","farm","fear","feeling","field","finger","fire","fireman","fish","flag","flame","flavor","flesh","flight","flock","floor","flower","flowers","fly","fog","fold","food","foot","force","fork","form","fowl","frame","friction","friend","friends","frog","frogs","front","fruit","fuel","furniture","gate","geese","ghost","giants","giraffe","glass","glove","gold","government","governor","grade","grain","grandfather","grandmother","grape","grass","grip","ground","group","growth","guide","guitar","gun","hair","haircut","hall","hammer","hand","hands","harbor","harmony","hat","head","health","heat","hill","history","hobbies","hole","holiday","home","honey","hook","hope","horn","horse","horses","hose","hospital","hot","hour","house","houses","humor","hydrant","ice","icicle","idea","impulse","income","increase","industry","ink","insect","instrument","insurance","interest","invention","iron","island","jail","jam","jar","jeans","jelly","jellyfish","jewel","join","judge","juice","jump","kettle","key","kick","kiss","kittens","kitty","knee","knife","knot","knowledge","laborer","lace","ladybug","lake","lamp","land","language","laugh","leather","leg","legs","letter","letters","lettuce","level","library","limit","line","linen","lip","liquid","loaf","lock","locket","look","loss","love","low","lumber","lunch","lunchroom","machine","magic","maid","mailbox","man","marble","mark","market","mask","mass","match","meal","measure","meat","meeting","memory","men","metal","mice","middle","milk","mind","mine","minister","mint","minute","mist","mitten","mom","money","month","moon","morning","mother","motion","mountain","mouth","move","muscle","name","nation","neck","need","needle","nerve","nest","night","noise","north","nose","note","notebook","number","nut","oatmeal","observation","ocean","offer","office","oil","orange","oranges","order","oven","page","pail","pan","pancake","paper","parcel","part","partner","party","passenger","payment","peace","pear","pen","pencil","person","pest","pet","pets","pickle","picture","pie","pies","pig","pigs","pin","pipe","pizzas","place","plane","planes","plant","plantation","plants","plastic","plate","play","playground","pleasure","plot","plough","pocket","point","poison","pollution","popcorn","porter","position","pot","potato","powder","power","price","produce","profit","property","prose","protest","pull","pump","punishment","purpose","push","quarter","quartz","queen","question","quicksand","quiet","quill","quilt","quince","quiver","rabbit","rabbits","rail","railway","rain","rainstorm","rake","range","rat","rate","ray","reaction","reading","reason","receipt","recess","record","regret","relation","religion","representative","request","respect","rest","reward","rhythm","rice","riddle","rifle","ring","rings","river","road","robin","rock","rod","roll","roof","room","root","rose","route","rub","rule","run","sack","sail","salt","sand","scale","scarecrow","scarf","scene","scent","school","science","scissors","screw","sea","seashore","seat","secretary","seed","selection","self","sense","servant","shade","shake","shame","shape","sheep","sheet","shelf","ship","shirt","shock","shoe","shoes","shop","show","side","sidewalk","sign","silk","silver","sink","sister","sisters","size","skate","skin","skirt","sky","slave","sleep","sleet","slip","slope","smash","smell","smile","smoke","snail","snails","snake","snakes","sneeze","snow","soap","society","sock","soda","sofa","son","song","songs","sort","sound","soup","space","spade","spark","spiders","sponge","spoon","spot","spring","spy","square","squirrel","stage","stamp","star","start","statement","station","steam","steel","stem","step","stew","stick","sticks","stitch","stocking","stomach","stone","stop","store","story","stove","stranger","straw","stream","street","stretch","string","structure","substance","sugar","suggestion","suit","summer","sun","support","surprise","sweater","swim","swing","system","table","tail","talk","tank","taste","tax","teaching","team","teeth","temper","tendency","tent","territory","test","texture","theory","thing","things","thought","thread","thrill","throat","throne","thumb","thunder","ticket","tiger","time","tin","title","toad","toe","toes","tomatoes","tongue","tooth","toothbrush","toothpaste","top","touch","town","toy","toys","trade","trail","train","trains","tramp","transport","tray","treatment","tree","trees","trick","trip","trouble","trousers","truck","trucks","tub","turkey","turn","twig","twist","umbrella","uncle","underwear","unit","use","vacation","value","van","vase","vegetable","veil","vein","verse","vessel","vest","view","visitor","voice","volcano","volleyball","voyage","walk","wall","war","wash","waste","watch","water","wave","waves","wax","way","wealth","weather","week","weight","wheel","whip","whistle","wilderness","wind","window","wine","wing","winter","wire","wish","wood","wool","word","work","worm","wound","wren","wrench","wrist","writer","writing","yak","yam","yard","yarn","year","yoke","zebra","zephyr","zinc","zipper","zoo"]}},C.Verbs=class{constructor(){this.words=["drip","touch","trouble","start","communicate","jog","order","strip","coach","relax","vanish","connect","shock","spray","radiate","spill","hate","rinse","seal","kiss","ask","train","handle","replace","cover","plan","jump","lick","jail","gather","comb","knit","drain","meddle","alert","ask","train","handle","replace","cover","plan","jump","lick","jail","gather","comb","knit","drain","meddle","alert","instruct","arrive","smash","worry","knock","satisfy","fade","time","record","hug","film","sip","request","miss","own","hook","unfasten","pop","drown","gaze","escape","hang","boil","discover","count","work","flower","precede","reproduce","blush","punish","hope","destroy","call","use","surprise","muddle","notice","confess","carry","lie","spell","heap","fasten","fire","flash","carve","accept","like","crush","rock","kill","joke","attempt","protect","concern","suit","appear","agree","sail","shrug","trace","rot","pretend","stir","chop","name","slow","injure","program","man","plant","examine","reply","face","promise","observe","copy","retire","mine","moan","attend","admire","command","learn","answer","prepare","impress","argue","whine","consist","interest","branch","bubble","realise","melt","walk","shop","squeeze","hum","tempt","spoil","remove","race","doubt","step","judge","desert","tap","afford","part","deliver","float","apologise","switch","share","phone","applaud","print","note","wreck","scream","follow","blink","arrange","sign","guarantee","stain","wash","lighten","tame","change","laugh","brake","tick","hammer","mate","mourn","smell","close","invite","rain","warm","occur","puncture","memorise","slap","terrify","check","delight","bolt","cross","settle","spare","type","guard","back","bore","poke","preach","fear","grin","approve","level","wave","pedal","stitch","obey","compare","ski","paint","serve","consider","bare","shelter","risk","bat","rub","double","mix","appreciate","disapprove","exercise","remember","smile","invent","enjoy","clear","cry","dress","flow","skip","empty","decorate","soak","suffer","produce","place","dream","guess","whip","burn","interfere","jam","trick","lock","talk","queue","tickle","complete","stuff","sound","confuse","introduce","amuse","paste","travel","number","water","scrape","correct","borrow","behave","snore","wink","excite","attract","mess up","reflect","camp","mark","tumble","soothe","point","disagree","provide","suspect","license","return","sparkle","buzz","juggle","continue","list","cure","nest","post","try","preserve","offend","challenge","develop","spark","enter","cause","identify","curl","frighten","tremble","peck","describe","squeak","remind","rob","sneeze","turn","listen","frame","rely","last","twist","reduce","tie","grease","welcome","rush","charge","dance","refuse","expect","embarrass","unite","disappear","ban","grate","bomb","pat","bless","hand","reign","strengthen","overflow","balance","announce","squash","pick","regret","unlock","spot","wrap","waste","remain","drop","scrub","flap","dislike","dare","x-ray","compete","repair","pour","harass","join","multiply","chase","sack","moor","fold","tug","receive","flood","prick","kick","fail","expand","fill","sin","wonder","decay","subtract","fax","signal","shade","curve","greet","clip","irritate","tip","depend","want","beg","file","earn","recognise","supply","dry","exist","collect","add","form","drum","deceive","zoom","march","annoy","murder","watch","heat","fry","dust","bleach","separate","bury","saw","polish","wriggle","stay","wish","brush","trip","weigh","colour","test","blot","open","itch","zip","wobble","paddle","cheer","extend","nod","yell","fix","dam","fetch","transport","visit","found","load","interrupt","long","tour","suppose","stretch","store","raise","pray","pine","divide","happen","punch","bang","stamp","yawn","disarm","question","obtain","haunt","admit","stop","ruin","influence","scold","pass","whisper","groan","succeed","need","mug","analyse","telephone","rescue","wipe","marry","advise","pump","explode","fence","crawl","bow","improve","thank","attack","manage","support","reject","tow","cheat","perform","educate","warn","grab","stroke","drag","move","peel","roll","knot","unpack","nail","possess","trade","pack","fool","kneel","blind","prefer","object","encourage","match","inform","bounce","wander","boast","beam","fit","present","squeal","treat","repeat","launch","fancy","label","explain","increase","land","choke","excuse","wrestle","screw","report","measure","sigh","harm","scratch","cough","imagine","mend","save","scatter","breathe","decide","rule","avoid","calculate","box","peep","detect","contain","grip","release","crack","offer","undress","whirl","permit","live","force","sprout","entertain","pinch","glue","love","hunt","scare","push","coil","untidy","bruise","wait","damage","sniff","trust","belong","crash","attach","pause","heal","battle","pull","plug","end","snow","bake","bump","deserve","intend","prevent","hurry","practise","play","reach","clap","delay","chew","matter","book","complain","milk","care","concentrate","strap","tire","cycle","trot","taste","scribble","hover","look","ignore","suck","hop","trap","shave","glow","owe","guide","press","head","whistle","snatch","rhyme","please","scorch","suspend","wail","smoke","thaw","arrest","stare","slip","clean","claim","suggest","surround","bathe","steer","search","park","inject","employ","shiver","tease","rejoice","allow","include","help"]}}})()})();