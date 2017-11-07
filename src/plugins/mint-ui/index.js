import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';
import { IndexList, IndexSection } from 'mint-ui';
import { Header } from 'mint-ui';
import { Button } from 'mint-ui';



Vue.prototype.$toast = Toast;

Vue.use(MintUI);
Vue.use(InfiniteScroll);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

