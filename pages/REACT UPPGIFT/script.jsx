
// --- BRANCHES --- //

// ----- Heirarchial ----- //
// : App( :: ItemList( ::: EditItem, ::: DeleteItem ), :: InputField )

// ----- Prolonged branch ----- //
// : = First, :: = Second, and so on.

// ::  App < ItemList
// 					 InputField
// ::: App < ItemList < DeleteItem
// 										< EditItem



// :
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {list:this.props.list};
		this.updateList = this.updateList.bind(this);
		this.fillOutForm = this.fillOutForm.bind(this);
		this.deleteObject = this.deleteObject.bind(this);}
	updateList(object) {
		let updatedList = this.state.list;
		updatedList.push(object);
		this.setState({list:updatedList});}
	fillOutForm(object) {
		let inputName = document.getElementById("inputName")
				inputName.value = object.name;
		let inputAge = document.getElementById("inputAge")
				inputAge.value = object.age
		let inputCountry = document.getElementById("inputCountry")
				inputCountry.value = object.country;}
	deleteObject(index) {
    this.state.list.splice(index, 1);
    this.forceUpdate();}
	editObject() {
		console.log('opened edit panel')}
	render() {
		return(
			<div id="App" onKeyPress={this.handleKeyPress}>
				<ItemList list={this.state.list} deleteObject={this.deleteObject} editObject={this.editObject} fillOutForm={this.fillOutForm}/>
				<InputField updateList={this.updateList} />
			</div>);}}

// ::
class ItemList extends React.Component {
	constructor(props) {super(props);}
	render() {
		let mappedList = this.props.list.map((object, index) => {
			return (
				<li key={index} id={'listItem' + index} className="listItem">
					<span className="prop">Name</span>    {object.name}    <br/>
					<span className="prop">Age</span>     {object.age}     <br/>
					<span className="prop">Country</span> {object.country} <br/>
					<button onClick={()=>{this.props.fillOutForm(object)}}>Copy</button>
					<DeleteItem deleteObject={this.props.deleteObject.bind(this)} index={index} />
					<EditItem editObject={this.props.editObject.bind(this)} index={index} />
				</li>);});
		return(
			<div id="ItemList">
				<ul>
					<h3>Objects:</h3>
					<h6>ctrl + click to copy object</h6>
					{mappedList}
				</ul>
			</div>);}}

// :::
class DeleteItem extends React.Component {
	constructor(props) {super(props);}
	render() {return(<button onClick={() => {this.props.deleteObject(this.props.index)}}> Delete </button>);}}

// :::
class EditItem extends React.Component {
	constructor(props) {super(props);}
	render() {return(<button onClick={() => {this.props.editObject(this.props.index)}}> Edit </button>);}}

// ::
class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.Submitted = this.Submitted.bind(this);}
	Submitted(event) {
		// Prevent page reload
		event.preventDefault();
		// Get values
		let inputName    = event.target.querySelector('#inputName');    let nameValue    = inputName.value;
		let inputAge     = event.target.querySelector('#inputAge');     let ageValue     = inputAge.value;
		let inputCountry = event.target.querySelector('#inputCountry'); let countryValue = inputCountry.value;
		// Clear inputs
		inputName.value = inputAge.value = inputCountry.value = '';
		let newObject = {name:nameValue, age:ageValue, country:countryValue};
		// Call list-updater
		this.props.updateList(newObject);}
	render() {
		return(
			<form id="InputField" onSubmit={this.Submitted}>
				<input type="text" id="inputName" placeholder="Name" />
				<input type="text" id="inputAge" placeholder="Age" />
				<input type="text" id="inputCountry" placeholder="Country" />
				<input type="submit" />
			</form>);}}



let objectList = [{name:'Gunnar', age:'20', country:'Sweden'},{name:'Lovie Hetzler', age:'13', country:'Morocco'},{name:'Berna Kavanaugh', age:'8', country:'New Zeeland'},{name:'Joni Cardon', age:'23', country:'Canada'},{name:'Lanelle Escalante', age:'43', country:'France'}];

ReactDOM.render(<App list={objectList}/>, document.getElementById('prototype'));
