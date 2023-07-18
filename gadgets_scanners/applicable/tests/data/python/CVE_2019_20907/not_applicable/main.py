import os
import tarfile
import tarfile as _

# _1 :: test for constant value
#       should not return evidence
tar = tarfile.open("Known")

# _2 :: test for constant value via some variable
#       should not return evidence
abcd = "isKnown"
tar = tarfile.open(abcd)

# _6 :: test for call order change (Known, Known)
#       should not return evidence
tar = tarfile.open(mode="r", name="Known")

# _7 :: test for call order change (Unknown, Known)
#       should not return evidence
Unknown = input()
tar = _.open(mode=Unknown, name="Known")
