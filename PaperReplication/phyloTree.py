import pandas as pd
from scipy.spatial.distance import pdist
from scipy.cluster.hierarchy import linkage, to_tree
from Bio import Phylo
from io import StringIO
import matplotlib.pyplot as plt

# Step 1: Read the CSV data
data = pd.read_csv('ACosmicHuntInTheBerberSky-Dataset.csv')

# Step 2: Transpose the data so that taxa are languages, and characters are sentences
data.set_index('Sentence', inplace=True)
data_transposed = data.transpose()

# Display the transposed data (optional)
print("Transposed Data:")
print(data_transposed.head())

# Step 3: Compute the distance matrix using Hamming distance
num_bits = data_transposed.shape[1]
distance_matrix = pdist(data_transposed.values, metric='hamming') * num_bits

# Display the condensed distance matrix (optional)
print("\nDistance Matrix (Condensed):")
print(distance_matrix)

# Step 4: Perform hierarchical clustering using UPGMA
linked = linkage(distance_matrix, method='average')  # 'average' corresponds to UPGMA

# Step 5: Convert the linkage matrix to Newick format
def get_newick(node, leaf_names):
    """
    Recursively traverse the tree to generate a Newick string with quoted and escaped leaf names.
    """
    if node.is_leaf():
        # Escape double quotes and backslashes in leaf names
        name = leaf_names[node.id].replace(' ', '').replace('\'', '')
        return f'"{name}"'
    else:
        left_newick = get_newick(node.get_left(), leaf_names)
        right_newick = get_newick(node.get_right(), leaf_names)
        return f"({left_newick},{right_newick})"

# Convert the linkage matrix to a tree and unpack the tuple
tree, _ = to_tree(linked, rd=True)

# Get leaf names
leaf_names = data_transposed.index.tolist()

# Generate Newick string without branch lengths
newick_str = get_newick(tree, leaf_names) + ";"

print("\nNewick Tree:")
print(newick_str)

# Step 6: Write the Newick string to a temporary file
with open("temp_newick.nwk", "w") as f:
    f.write(newick_str)

# Step 7: Parse the Newick string with Bio.Phylo and visualize it
phylo_tree = Phylo.read("temp_newick.nwk", "newick")

# Draw the tree
Phylo.draw(phylo_tree, do_show=False)
plt.title("Phylogenetic Tree of Languages (UPGMA)", fontsize=15)
plt.show()

# Optional: Save the tree to a file in Newick format
with open("output_tree.newick", "w") as f:
    f.write(newick_str)

print("\nPhylogenetic tree has been saved to 'output_tree.newick'")
