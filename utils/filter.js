export function filter(source,array,index,layer) {
	console.log(source,array,index,layer,11)
	//使layer走到位置
	for(let i = 0; i <= layer; i++) {
		source = source[index[i]].children
	}
	array = array.slice(0,layer+1)
	index = index.slice(0,layer+1)
	console.log(source)
	layer++
	// source = source[layer].children
	// array[++layer] = source.map((item,index) => item.name)
	// if(layer == 0) {
		while(source) {
			array[layer] = source.map((item,index) => item.name)
			source = source[0].children
			index[layer] = 0
			layer++
		}
	// }
	// console.log(source,array,index,112)
	return {
		array,
		index
	}
}