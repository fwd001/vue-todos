// 头部组件
var Header = Vue.component('v-header', {
	props: ['add'],
	template: `<header class="header">
					<h1>todos</h1>
					<input v-on:keyup.enter="onAdd" class="new-todo" placeholder="What needs to be done?" autofocus v-model="contant">
				</header>`,
	data() {
		return {
			contant: ''
		}
	},
	methods: {
		onAdd(e) {
			console.log(e.target)
			const val = e.target.value
			if (val) {
				this.add(val)
				this.contant = ''
			}
		}
	}
})

// 内容列表组件
var Main = Vue.component('v-main', {
	props: ['list', 'del', 'change', 'dataSource', 'changeVisible', 'isshow'],
	template: `<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label  for="toggle-all" v-on:click="changeVisible">Mark all as complete</label>
				<ul v-show='isshow' class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class 'editing' when editing and 'completed' when marked as completed -->
					<li v-for="item in newList" :key="item.id" v-bind:class="{completed: item.iscompleted}">
						<div class="view">
							<input v-on:click="change(item.id)" class="toggle" type="checkbox" v-bind:checked="item.iscompleted">
							<label>{{item.contant}}</label>
							<button class="destroy" v-on:click="del(item.id)"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
				</ul>
			</section>`,
	data() {
		return {
		}
	},
	methods: {},
	computed: {
		newList() {
			switch (this.dataSource) {
				case 'all':
					return this.list
				case 'active':
					return this.list.filter(v => !v.iscompleted)
				default:
					return this.list.filter(v => v.iscompleted)
			}
		}
	}
})
// 尾部数据统计组件
var Footer = Vue.component('v-footer', {
	props: ['itemLeft', 'clear', 'change', 'dataSource'],
	template: `<footer class="footer">
		<span class="todo-count"><strong>{{itemLeft}}</strong> item left</span>
			<ul class="filters">
				<li>
					<a :class="{selected:dataSource === 'all'}" v-on:click="change('all')">All</a>
				</li>
				<li>
					<a :class="{selected:dataSource === 'active'}" v-on:click="change('active')">Active</a>
				</li>
				<li>
					<a :class="{selected:dataSource === 'completed'}" v-on:click="change('completed')">Completed</a>
				</li>
			</ul>
			<!-- Hidden if no completed items are left ↓ -->
			<button class="clear-completed"  v-on:click="clear">Clear completed</button>
		</footer>`,
	data() {
		return {
			contant: ''
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		list: [],
		dataSource: 'all', // all , active, completed
		isshow: false
	},
	computed: {
		// 计算属性的 getter
		itemLeft: function () {
			// `this` 指向 vm 实例
			const itemLeft = this.list.filter(v => !v.iscompleted)
			return itemLeft.length
		}
	},
	methods: {
		add(val) {
			const id = this.list.length > 0 ? this.list[0].id + 1 : 0
			this.list.unshift({
				id,
				contant: val,
				iscompleted: false
			})
			this.isshow = true
			this.dataSource = 'all'
		},
		del(id) {
			const newList = this.list.filter(v => v.id !== id)
			this.list = [...newList]
		},
		changeStatus(id) {
			const item = this.list.find(v => v.id === id)
			item.iscompleted = !item.iscompleted
		},
		clear() {
			const newList = this.list.filter(v => !v.iscompleted)
			this.list = [...newList]
		},
		changeDataSource(val) {
			this.dataSource = val
		},
		changeVisible() {
			this.isshow = !this.isshow
		}
	}
})