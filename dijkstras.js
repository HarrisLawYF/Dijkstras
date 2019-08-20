
//Algorithm Technique
//https://www.javatpoint.com/fractional-knapsack-problem
// 1) Divide and conquer
// 2) Greedy technique
// 3) Dynamic programming
// 4) Branch and bound
// 5) Randomized algorithm
// 6) Backtracking algorithm (botoom-to-top dynamic programming)

//Loop invariants -- a justification technique

//-------------------------------- Need better explanation on this-----------------------------------
//Asymptotic analysis of algorithm, we normally reduce the function down to the highest order, for better analytics.
//eg, n^2+bn+c, we will focus on n^2 because it has the most impact when n gets big.
//We use this to generate best case and worst case, Big-O case (longest amount of time), Omega (lower bound), Theta (tight bound)

//Recurrence Relation (to deduce the complexity of a function)
//Substitution (requires experience to guess the solution first and prove it)
//Iteration, Recursion Tree, Master method
//---------------------------------------------------------------------------------------------------


//Note: Dijkstras won't create cyclic path if there's no negative weight, because it is a greedy algorithm, 
//and doesn't not try to include the same node, if it has already connected

var V = 9;
var max = 999999;

function minDistance(dist,sptSet) 
{ 
	// Initialize min value 
	var min = max, min_index = -1; 
	//Note: in the first interation, min_index will definitely be 0, because we preset dist[src] = 0, where src = 0
	console.log(sptSet);
	console.log(dist);
	for (var v = 0; v < V; v++){
		//Note: selected note with lowest weight will be marked with sptSet true later, so when new heavier weight comes in, they will be re-measured again
		if (sptSet[v] == false &&  dist[v] <= min) 
		{ 
			min = dist[v];
			min_index = v;
		}
	}
	return min_index; 
}

function printSolution(dist, n) 
{ 
    console.log("Vertex     Distance " +  
                        "from Source\n"); 
    for (var i = 0; i < V; i++) 
        console.log(i + " \t\t " +  
                    dist[i] + "\n"); 
} 


function dijkstra(graph, src) 
{ 
    var dist = []; 
	// The output array. dist[i] 
	// will hold the shortest  
	// distance from src to i 
  
    // sptSet[i] will true if vertex 
    // i is included in shortest path  
    // tree or shortest distance from  
    // src to i is finalized 
    var sptSet = [];
  
    // Initialize all distances as  
    // INFINITE and stpSet[] as false 
    for (var i = 0; i < V; i++) 
    { 
        dist[i] = max; 
        sptSet[i] = false; 
    } 
  
    // Distance of source vertex 
    // from itself is always 0
    dist[src] = 0; 
  
    // Find shortest path for all vertices 
    for (var count = 0; count < V; count++) 
    { 
        // Pick the minimum distance vertex  
        // from the set of vertices not yet  
        // processed. u is always equal to  
        // src in first iteration.
		
        var u = minDistance(dist, sptSet);
		console.log(u);
		console.log("------------------------");
  
        // Mark the picked vertex as processed 
        sptSet[u] = true; 
  
        // Update dist value of the adjacent  
        // vertices of the picked vertex. 
        for (var v = 0; v < V; v++){
			// Update dist[v] only if is not in  
            // sptSet, there is an edge from u  
            // to v, and total weight of path  
            // from src to v through u is smaller
            // than current value of dist[v] 
			
			//Note: this is to slowly populate discovered route with weights
			//In summary, it will evaluate all incoming route on the current node, and pick only the smallest one, therefore, there will be no cyclic
			//Which also means, all nodes will only have 0 or 1 incoming path accepted
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != max && dist[u] + graph[u][v] < dist[v]){
					dist[v] = dist[u] + graph[u][v];
			}
		}
    } 
  
    // print the constructed distance array 
    printSolution(dist, V); 
} 

var graph = [[0, 4, 0, 0, 0, 0, 0, 8, 0], //link with weights from node 0 to itself, and other vertices
		  [4, 0, 8, 0, 0, 0, 0, 11, 0], //link with weights from node 1 to itself, and other vertices
		  [0, 8, 0, 7, 0, 4, 0, 0, 2], //link with weights from node 2 to itself, and other vertices
		  [0, 0, 7, 0, 9, 14, 0, 0, 0], //link with weights from node 3 to itself, and other vertices
		  [0, 0, 0, 9, 0, 10, 0, 0, 0], //link with weights from node 4 to itself, and other vertices
		  [0, 0, 4, 14, 10, 0, 2, 0, 0], //link with weights from node 5 to itself, and other vertices
		  [0, 0, 0, 0, 0, 2, 0, 1, 6], //link with weights from node 6 to itself, and other vertices
		  [8, 11, 0, 0, 0, 0, 1, 0, 7], //link with weights from node 7 to itself, and other vertices
		  [0, 0, 2, 0, 0, 0, 6, 7, 0]]; //link with weights from node 8 to itself, and other vertices
dijkstra(graph, 0); 